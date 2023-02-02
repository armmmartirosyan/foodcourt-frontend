import React, {useCallback, useState} from 'react';
import Account from "../helpers/Account";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addBasketRequest} from "../store/actions/basket";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import PropTypes from "prop-types";

function QuantityControl(props) {
    const {productId, price} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleChangeQuantity = useCallback((num) => {
        if (num >= 1) setQuantity(num);
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

        console.log('added');
    }, [productId, quantity]);

    return (
        <div className="products__card__control">
            <div className="products__card__quantity">
                <p className="products__card__quantity__text">Quantity</p>
                <div className="products__card__quantity__container">
                    <button
                        className="products__card__quantity__control"
                        onClick={() => {
                            handleChangeQuantity(quantity - 1);
                        }}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="products__card__quantity__input"
                        value={quantity}
                        onChange={(e) => {
                            handleChangeQuantity(e.target.value);
                        }}
                    />
                    <button
                        className="products__card__quantity__control"
                        onClick={() => {
                            handleChangeQuantity(quantity + 1);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
            <p className="products__card__total">
                Total price - <span className='products__card__total__price'>{`${+price * +quantity}RUR`}</span>
            </p>
            <button
                className="products__card__add btn__bg"
                onClick={handleAddToBasket}
            >
                Add
            </button>
        </div>
    );
}

QuantityControl.propTypes = {
    productId: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
}

export default QuantityControl;
