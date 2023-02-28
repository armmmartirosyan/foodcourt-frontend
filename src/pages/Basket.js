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
import {getAllPaymentTypesRequest} from "../store/actions/paymentTypes";
import {getBranchesListRequest} from "../store/actions/branches";
import {addOrderRequest} from "../store/actions/order";
import Validator from "../helpers/Validator";
import OrderModal from "../components/OrderModal";

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
        if (!Account.getToken()) {
            navigate('/login');
            return;
        }

        (async () => {
            const data = await dispatch(getBasketRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                return;
            }

            setBasketProducts(data.payload.basket);

            const dataPaymentTypes = await dispatch(getAllPaymentTypesRequest());

            if (!_.isEmpty(dataPaymentTypes.payload) && (dataPaymentTypes.payload?.status === 'error' || dataPaymentTypes.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(dataPaymentTypes.payload.message)));
                return;
            }

            const ptList = dataPaymentTypes.payload.paymentTypes;
            setPaymentTypes(ptList.map(item => {
                return {
                    value: item.type,
                    label: item.typeName,
                }
            }))

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
            Validator.validString(values.note),
            Validator.validObject(values.branch),
            Validator.validObject(values.paymentType),
            Validator.validArray(productsList),
            values.paymentType.value === 'cashOnDelivery' ? Validator.validString(values.address) : true,
        ];

        const invalidVal = validateValues.find((v) => v !== true);

        if (invalidVal) {
            toast.error(`Invalid ${invalidVal}`);
            return;
        }

        const data = await dispatch(addOrderRequest({
            productsList,
            message: values.note,
            address: values.address,
            receiveType: values.paymentType.value,
            branchId: values.branch.value,
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        navigate('/');
        toast.success('Order successfully added');
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
            pageName='Basket'
        >
            <section className="basket">
                <div className="container">
                    <button
                        className="basket__actual btn__bg"
                        onClick={handleOpenCloseModal}
                    >
                        Actual orders
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
                                `Total price - ${totalPrice} AMD`}
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
                                    placeholder='Payment type'
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
                                    placeholder='Branches'
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
                            placeholder='Address'
                            value={values.address}
                            onChange={(e) => {
                                handleChangeValues('address', e.target.value)
                            }}
                        />
                        <textarea
                            className="payment__notes"
                            placeholder='Special notes'
                            value={values.note}
                            onChange={(e) => {
                                handleChangeValues('note', e.target.value)
                            }}
                        />
                        <button className="btn__bg">Order</button>
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
