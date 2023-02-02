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

function Basket() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket.basket);
    const [totalPrice, setTotalPrice] = useState(0);
    const basketStatus = useSelector(state => state.status.basketGetListStatus);

    useEffect(() => {
        if (!Account.getToken()) {
            navigate('/login');
            return;
        }

        (async () => {
            const data = await dispatch(getBasketRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    useEffect(() => {
        let totalPrice = 0;

        basket.forEach(item => {
            totalPrice = totalPrice + (+item.quantity * +item.product.price);
        });

        setTotalPrice(totalPrice);
    }, [basket]);

    const handleRemove = useCallback(async (id) => {
        //todo validacia
        const data = await dispatch(removeFromBasketRequest({id}));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        await dispatch(getBasketRequest());
    }, []);

    return (
        <Wrapper
            statuses={{basketStatus}}
            pageName='Basket'
        >
            <section className="basket">
                <div className="container">
                    {
                        !_.isEmpty(basket) ? (
                            basket.map(item => (
                                <BasketCard
                                    key={item.id}
                                    item={item}
                                    handleRemove={handleRemove}
                                />
                            ))
                        ) : null
                    }
                </div>
                {
                    totalPrice ? (
                        <p className="basket__total">{`Total - ${totalPrice} RUR`}</p>
                    ) : null
                }
            </section>
        </Wrapper>
    );
}

export default Basket;
