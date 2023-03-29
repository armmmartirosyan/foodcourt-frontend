import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import Account from "../helpers/Account";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getBasketRequest, removeFromBasketRequest} from "../store/actions/basket";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import BasketCard from "../components/BasketCard";
import Select from "react-select";
import {getPaymentTypesRequest} from "../store/actions/paymentTypes";
import {getBranchesListRequest} from "../store/actions/branches";
import {addOrderRequest} from "../store/actions/order";
import Validator from "../helpers/Validator";
import OrderModal from "../components/OrderModal";
import {getCurrentAccountRequest} from "../store/actions/user";
import Price from "../helpers/Price";

function Basket() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basketStatus = useSelector(state => state.status.basketGetListStatus);
    const paymentTypesStatus = useSelector(state => state.status.paymentTypesStatusGetAllStatus);
    const [totalPrice, setTotalPrice] = useState(0);
    const [basketProducts, setBasketProducts] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [branches, setBranches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [values, setValues] = useState({
        note: '',
        address: '',
        branch: {},
        paymentType: {},
    });

    useEffect(() => {
        if (!Account.getToken()) return navigate('/login');

        (async () => {
            await dispatch(getCurrentAccountRequest());
            const dataPaymentTypes = await dispatch(getPaymentTypesRequest());

            if (!_.isEmpty(dataPaymentTypes.payload) && (dataPaymentTypes.payload?.status === 'error' || dataPaymentTypes.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(dataPaymentTypes.payload.message)));
                return;
            }

            const ptList = dataPaymentTypes?.payload?.paymentTypes || [];
            const allowUse = ptList.map(payment => payment.allowUse);

            if(_.isEmpty(ptList) || !allowUse.includes('t')) return navigate('/');

            setPaymentTypes(ptList.map(item => {
                return {
                    value: item.id,
                    label: item.typeName,
                }
            }))

            const data = await dispatch(getBasketRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                return;
            }

            setBasketProducts(data.payload.basket);

            const dataBranches = await dispatch(getBranchesListRequest());

            if (!_.isEmpty(dataBranches.payload) && (dataBranches.payload?.status === 'error' || dataBranches.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(dataBranches.payload.message)));
                return;
            }

            const branchesList = dataBranches.payload.branches;
            setBranches(branchesList.map(item => {
                return {
                    value: item.id,
                    label: item.title,
                }
            }))
        })()
    }, []);

    useEffect(() => {
        let totalPrice = 0;

        basketProducts.forEach(item => {
            totalPrice = totalPrice + (+item.quantity * +item.product.price);
        });

        setTotalPrice(totalPrice);
    }, [basketProducts]);

    const handleRemove = useCallback(async (id) => {
        const data = await dispatch(removeFromBasketRequest({id}));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        setBasketProducts(basketProducts.filter(item => item.id !== id));
    }, [basketProducts]);

    const handleChangeValues = useCallback((key, value) => {
        if (key && value) {
            setValues({
                ...values,
                [key]: value
            })
            return;
        }

        setValues({
            note: '',
            address: '',
            branch: {},
            paymentType: {},
        })
    }, [values]);

    const handleOrder = useCallback(async (e) => {
        e.preventDefault();

        const productsList = basketProducts.map(item => {
            return {
                productId: item.product.id,
                quantity: item.quantity,
            }
        });

        const validateValues = [
            Validator.validObject(values.branch, 'Недопустимое значение для ветки'),
            Validator.validObject(values.paymentType, 'Недопустимое значение для типа оплаты'),
            Validator.validArray(productsList, 'Недопустимое значение для списка продуктов'),
            values.note ? Validator.validString(values.note, 'Недопустимое значение для примечания'): true,
            values.paymentType.value === '1' ? Validator.validString(values.address, 'Неверное значение адреса') : true,
        ];

        const invalidVal = validateValues.find((v) => v !== true);

        if (invalidVal) {
            toast.error(invalidVal);
            return;
        }

        const data = await dispatch(addOrderRequest({
            productsList,
            message: values.note,
            address: values.address,
            paymentTypeId: values.paymentType.value,
            branchId: values.branch.value,
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        navigate('/');
        toast.success('Заказ добавлен');
    }, [basketProducts, values]);

    const handleChangeProductQuantity = useCallback((quantity, productId) => {
        if (quantity < 1 || quantity > 50) return;

        setBasketProducts(basketProducts.map(item => {
            if (item.product.id === productId) {
                return {
                    ...item,
                    quantity: quantity
                }
            }

            return {...item}
        }))
    }, [basketProducts]);

    const handleOpenCloseModal = useCallback(() => {
        setShowModal(prevState => !prevState)
    },[]);

    return (
        <Wrapper
            statuses={{basketStatus, paymentTypesStatus}}
            pageName='Корзина'
        >
            <section className="basket">
                <div className="container">
                    <button
                        className="basket__actual btn__bg"
                        onClick={handleOpenCloseModal}
                    >
                        Актуальные заказы
                    </button>
                    {
                        !_.isEmpty(basketProducts) ? (
                            basketProducts.map(item => (
                                <BasketCard
                                    key={item.id}
                                    item={item}
                                    handleRemove={handleRemove}
                                    handleChangeProductQuantity={handleChangeProductQuantity}
                                />
                            ))
                        ) : null
                    }
                </div>
            </section>
            <section className="payment">
                <div className="container">
                    {
                        totalPrice ? (
                            <p className="basket__total">{
                                `Итоговая цена - ${Price.price(totalPrice)} RUB`}
                            </p>
                        ) : null
                    }
                    <form className="payment__form" onSubmit={handleOrder}>
                        {
                            !_.isEmpty(paymentTypes) ? (
                                <Select
                                    className="payment__types"
                                    classNamePrefix="payment__types"
                                    name="Payment Types"
                                    isClearable={true}
                                    isSearchable={false}
                                    options={paymentTypes}
                                    placeholder='Способ оплаты'
                                    value={values?.paymentType?.value ? values.paymentType : undefined}
                                    onChange={(type) => {
                                        handleChangeValues('paymentType', type)
                                    }}
                                />
                            ) : null
                        }
                        {
                            !_.isEmpty(branches) ? (
                                <Select
                                    className="payment__types"
                                    classNamePrefix="payment__types"
                                    name="Branches"
                                    isClearable={true}
                                    isSearchable={false}
                                    options={branches}
                                    placeholder='Ветви'
                                    value={values?.branch?.value ? values.branch : undefined}
                                    onChange={(branch) => {
                                        handleChangeValues('branch', branch)
                                    }}
                                />
                            ) : null
                        }
                        <input
                            type="text"
                            className="payment__address"
                            placeholder='Адрес'
                            value={values.address}
                            onChange={(e) => {
                                handleChangeValues('address', e.target.value)
                            }}
                        />
                        <textarea
                            className="payment__notes"
                            placeholder='Специальные примечания'
                            value={values.note}
                            onChange={(e) => {
                                handleChangeValues('note', e.target.value)
                            }}
                        />
                        <button className="btn__bg">Заказать</button>
                    </form>
                </div>
            </section>
            {
                showModal ? (
                    <OrderModal
                        showModal={showModal}
                        onClose={handleOpenCloseModal}
                    />
                ) : null
            }
        </Wrapper>
    );
}

export default Basket;
