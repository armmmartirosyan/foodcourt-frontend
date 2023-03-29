import React, {useCallback, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {changePasswordRequest} from "../store/actions/user";
import _ from "lodash";
import Helper from "../helpers/Helper";
import Form from "../components/Form";
import Validator from "../helpers/Validator";

const drawDataChangePass = [
    {
        label: 'Пароль',
        path: 'password',
    },
    {
        label: 'Подтвердите пароль',
        path: 'confirmPassword',
    },
    {
        label: 'Ключ',
        path: 'token',
    },
    {
        label: 'Назад',
        path: 'back',
    },
    {
        label: 'Изменить пароль',
        path: 'submit',
    },
];

function ChangePasswordStep2() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const changePassStatus = useSelector(state => state.status.userChangePasswordStatus);
    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        key: '',
    });

    const email = useMemo(() => {
        if (params.email) return params.email;
    }, [params.email]);

    const handleChangeValues = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    }, [values]);

    const handleChangePassword = useCallback(async (e) => {
        e.preventDefault();

        const validateValues = [
            Validator.validEmail(email, 'Недопустимое значение для электронной почты'),
            Validator.validEverySymbol(values.password, 'Неверное значение пароля'),
            Validator.validEverySymbol(values.token, 'Недопустимое значение для ключа'),
        ];

        const invalidVal = validateValues.find((v) => v !== true);

        if (invalidVal) {
            toast.error(invalidVal);
            return;
        }

        const data = await dispatch(changePasswordRequest({
            email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            token: values.token
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        toast.success("Пароль изменен");
        navigate(!_.isEmpty(user) ? `/profile` : `/login`)
    }, [email, values]);

    const handleBack= useCallback((e) => {
        e.preventDefault();
        window.history.back();
    }, []);

    return (
        <Wrapper
            statuses={{changePassStatus}}
            pageName='Сменить пароль шаг 2'
            hasFooter={false}
        >
            {
                email ? (
                    <section className="login">
                        <div className="container">
                            <Form
                                handleChangeValues={handleChangeValues}
                                handleSubmit={handleChangePassword}
                                drawData={drawDataChangePass}
                                handleBack={handleBack}
                                values={values}
                                title='Изменить пароль'
                            />
                        </div>
                    </section>
                ) : null
            }
        </Wrapper>
    );
}

export default ChangePasswordStep2;
