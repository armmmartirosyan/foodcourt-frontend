import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import Card from "../components/Card";
import _ from 'lodash';
import {getCurrentAccountRequest} from "../store/actions/user";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import {setupIntent} from "../store/actions/payment";

function AddCard() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [values, setValues] = useState({
        number: '',
        month: '',
        year: '',
        cvc: ''
    });

    useEffect(() => {
        (async () => {
            const data = await dispatch(getCurrentAccountRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            }
        })()
    }, []);

    const handleChange = useCallback((key, val) => {
        const reg = /^\d*$/;

        if (reg.test(val)) {
            if ((key === 'month' && val <= 12 && val.length <= 2 && val !== '00')
                || (key === 'cvc' && val.length <= 3)
                || (key === 'year' && val.length <= 4)
                || (key === 'number' && val.length <= 16)) {
                setValues({
                    ...values,
                    [key]: val,
                })
            }
        }
    }, [values]);

    const handleAddCard = useCallback(async () => {
        if (!_.isEmpty(user)) {
            if (values.number.length < 16
                || !values.month
                || values.year.length < 4
                || values.cvc.length < 3) {
                toast.error('Error');
                return;
            }

            // const data = await dispatch(setupIntent());
            //
            // if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            //     toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            //     return;
            // }


        }
    }, [user, values]);

    return (
        <Wrapper
            pageName='Add card'
        >
            <section className="card__add">
                <div className="container">
                    <h1 className="card__add__title">Add card</h1>
                    <Card
                        values={values}
                        handleChange={handleChange}
                    />
                    <button
                        className="card__add__btn btn__bg"
                        onClick={handleAddCard}
                    >
                        Add card
                    </button>
                </div>
            </section>
        </Wrapper>
    );
}

export default AddCard;
