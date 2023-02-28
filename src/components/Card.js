import React, {useCallback} from 'react';
import _ from "lodash";
import {setupIntent} from "../store/actions/order";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import {PaymentElement, CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useDispatch, useSelector} from "react-redux";

const {REACT_APP_API_URL} = process.env;

function Card(props) {
    const {handleChange, values, stripeData} = props;
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector(state => state.user.user);

    const handleAddCard = useCallback(async () => {
        if (!_.isEmpty(user)) {
            // if (values.number.length < 16
            //     || !values.month
            //     || values.year.length < 4
            //     || values.cvc.length < 3) {
            //     toast.error('Error');
            //     return;
            // }
            // const data = await dispatch(setupIntent());
            //
            // if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            //     toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            //     return;
            // }
            // console.log(data.payload);

            // try {
            //     stripe
            //         .createPaymentMethod({
            //             type: "card",
            //             card: {
            //                 number: values.number,
            //                 exp_year: values.year,
            //                 exp_month: values.month,
            //                 cvc: values.cvc
            //             },
            //         })
            //         .then((resp) => {
            //             console.log(resp);
            //         });
            // } catch (err) {
            //     console.log(err)
            // }

            //console.log(stripeData,  '--stripeData.clientSecret---')

            // const {clientSecret} = await fetch('/create/payment/intent', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application.json',
            //     },
            //     body: JSON.stringify({
            //         paymentMethodType: 'card',
            //         currency: 'eur',
            //     }),
            // }).then(r => r.json())


            const paymentMethod = await stripe.confirmCardPayment(
                stripeData.intent,
                {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                }
            );

            console.log(paymentMethod);

        }
    }, [stripeData, user, stripe]);

    return (
        <>
            {/*<div className="card__wrapper">
                <div className="card__first">
                    <form className="card__first__form">
                        <input
                            type="text"
                            className="card__first__number"
                            placeholder='0000 0000 0000 0000'
                            value={values.number}
                            onChange={(e) => {
                                handleChange('number', e.target.value)
                            }}
                        />
                        <div className="card__first__form__box">
                            <input
                                type="text"
                                className="card__first__input"
                                placeholder='ММ'
                                value={values.month}
                                onChange={(e) => {
                                    handleChange('month', e.target.value)
                                }}
                            />
                            <p className="card__first__dash">/</p>
                            <input
                                type="text"
                                className="card__first__input"
                                placeholder='ГГ'
                                value={values.year}
                                onChange={(e) => {
                                    handleChange('year', e.target.value)
                                }}
                            />
                        </div>
                    </form>
                </div>
                <div className="card__second">
                    <div className="card__second__box">
                        <div className="card__second__number"></div>
                        <input
                            type="text"
                            className="card__second__cvc"
                            placeholder='CVV/CVC'
                            value={values.cvc}
                            onChange={(e) => {
                                handleChange('cvc', e.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>*/}
            <div className="card__wrapper">
                <CardElement/>
                <button
                    className="card__add__btn btn__bg"
                    onClick={handleAddCard}
                >
                    Add card
                </button>
            </div>
        </>
    );
}

export default Card;
