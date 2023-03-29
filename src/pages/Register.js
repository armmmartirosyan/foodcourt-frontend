import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Wrapper from "../components/Wrapper";
import {registerRequest} from "../store/actions/user";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import {useNavigate} from "react-router-dom";
import {getPaymentTypesRequest} from "../store/actions/paymentTypes";
import Form from "../components/Form";
import Validator from "../helpers/Validator";

const drawData = [
    {
        label: 'Имя',
        path: 'firstName',
    },
    {
        label: 'Электронная почта',
        path: 'email',
    },
    {
        label: 'Пароль',
        path: 'password',
    },
    {
        label: 'Подтвердите пароль',
        path: 'confirmPassword',
    },
    {
        label: 'Номер телефона',
        path: 'phoneNum',
    },
    {
        label: 'Зарегистрироваться',
        path: 'submit',
    },
];

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerUserStatus = useSelector(state => state.status.userRegisterStatus);
    const [values, setValues] = useState({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNum: '',
    });

    useEffect(() => {
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

    const handleRegister = useCallback(async (e) => {
        e.preventDefault();

        const validateValues = [
            Validator.validString(values.firstName, 'Недопустимое значение для имени'),
            Validator.validEmail(values.email, 'Недопустимое значение для электронной почты'),
            Validator.validEverySymbol(values.password, 'Неверное значение пароля'),
            Validator.validEverySymbol(values.confirmPassword, 'Неверное значение для подтверждения пароля'),
            Validator.validPhoneNum(values?.phoneNum?.replace("+", ""), 'Недопустимое значение для номера телефона'),
        ];

        const invalidVal = validateValues.find((v) => v !== true);

        if (invalidVal) {
            toast.error(invalidVal);
            return;
        }

        const data = await dispatch(registerRequest({
            firstName: values.firstName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            phoneNum: values.phoneNum.replace("+", ""),
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            return;
        }

        toast.success(`Пользователь зарегистрирован`);
        navigate('/login');
    }, [values]);

    return (
        <Wrapper
            statuses={{registerUserStatus}}
            pageName='Регистрация'
            hasFooter={false}
        >
            <section className="login">
                <div className="container">
                    <Form
                        handleSubmit={handleRegister}
                        handleChangeValues={handleChangeValues}
                        values={values}
                        drawData={drawData}
                        title='Регистрация'
                    />
                </div>
            </section>
        </Wrapper>
    );
}

export default Register;
