import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {loginRequest} from "../store/actions/user";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import {useNavigate} from "react-router-dom";
import Account from "../helpers/Account";
import {getPaymentTypesRequest} from "../store/actions/paymentTypes";
import Form from "../components/Form";
import Validator from "../helpers/Validator";

const drawData = [
    {
        label: 'Электронная почта',
        path: 'email',
    },
    {
        label: 'Пароль',
        path: 'password',
    },
    {
        label: 'Запомнить',
        path: 'remember',
    },
    {
        label: 'Вход',
        path: 'submit',
    },
];

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginStatus = useSelector(state => state.status.userLoginStatus);
    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false
    });

    useEffect(() => {
        if (Account.getToken()) return navigate('/');

        (async () => {
            const data = await dispatch(getPaymentTypesRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                return;
            }

            const paymentTypes = data?.payload?.paymentTypes || [];
            const allowUse = paymentTypes.map(payment => payment.allowUse);

            if(_.isEmpty(paymentTypes) || !allowUse.includes('t')) navigate('/');
        })()
    }, []);

    const handleChangeValues = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    }, [values]);

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();

        const validateValues = [
            Validator.validEmail(values.email, 'Недопустимое значение для электронной почты'),
        ];

        const invalidVal = validateValues.find((v) => v !== true);

        if (invalidVal || !values.password) {
            toast.error('Неправильный адрес электронной почты или пароль');
            return;
        }

        const data = await dispatch(loginRequest({
            email: values.email,
            password: values.password,
            remember: values.remember,
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        window.location.href = "/";
    }, [values]);

    return (
        <Wrapper
            statuses={{loginStatus}}
            pageName='Вход'
            hasFooter={false}
        >
            <section className="login">
                <div className="container">
                    <Form
                        title='Вход'
                        handleChangeValues={handleChangeValues}
                        handleSubmit={handleLogin}
                        drawData={drawData}
                        values={values}
                        onClickForgotPassword={() => navigate('/change-password-step-1')}
                    />
                </div>
            </section>
        </Wrapper>
    );
}

export default Login;
