import React, {useCallback, useState} from 'react';
import Account from "../helpers/Account";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addBasketRequest} from "../store/actions/basket";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import PropTypes from "prop-types";
import classNames from "classnames";

function QuantityControl(props) {
    const {
        productId,
        price,
        allowAdd = false,
        isRow = false,
        handleChangeProductQuantity,
        quantityFromOut,
    } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleChangeQuantity = useCallback((num) => {
        if (num > 0 && num < 50) setQuantity(num);
    }, []);

    const handleAddToBasket = useCallback(async () => {
        if (!Account.getToken()) {
            navigate('/login');
            return;
        }

        const data = await dispatch(addBasketRequest({productId, quantity}));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        toast.success('Product successfully added to basket.');
    }, [productId, quantity]);

    return (
        <div className={classNames('products__card__control', {row: isRow})}>
            <div className="products__card__quantity">
                <p className="products__card__quantity__text">Quantity</p>
                <div className="products__card__quantity__container">
                    <button
                        className="products__card__quantity__control"
                        onClick={() => {
                            handleChangeProductQuantity ?
                                handleChangeProductQuantity(quantityFromOut - 1, productId) : handleChangeQuantity(quantity - 1);
                        }}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="products__card__quantity__input"
                        value={quantityFromOut || quantity}
                        disabled
                    />
                    <button
                        className="products__card__quantity__control"
                        onClick={() => {
                            handleChangeProductQuantity ?
                                handleChangeProductQuantity(quantityFromOut + 1, productId) : handleChangeQuantity(quantity + 1);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
            <p className="products__card__total">
                Total price <span className='products__card__total__price'>{`${+price * (+quantityFromOut || +quantity)}AMD`}</span>
            </p>
            {
                allowAdd ? (
                    <button
                        className="products__card__add btn__bg"
                        onClick={handleAddToBasket}
                    >
                        Add
                    </button>
                ) : null
            }
        </div>
    );
}

QuantityControl.propTypes = {
    productId: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    isRow: PropTypes.bool,
    allowAdd: PropTypes.bool,
    quantityFromOut: PropTypes.number,
    handleChangeProductQuantity: PropTypes.func,
}

export default QuantityControl;
