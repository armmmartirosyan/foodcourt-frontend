import React, {useCallback, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {changeEmailRequest} from "../store/actions/user";
import _ from "lodash";
import Helper from "../helpers/Helper";
import Form from "../components/Form";
import Validator from "../helpers/Validator";

const drawDataChangePass = [
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

function ChangeEmailStep2() {
    const {email} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changePassStatus = useSelector(state => state.status.userChangeEmailStatus);
    const [values, setValues] = useState({
        key: '',
    });

    const handleChangeValues = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    }, [values]);

    const handleChangeEmail = useCallback(async (e) => {
        e.preventDefault();

        const validateValues = [
            Validator.validEverySymbol(values.token, 'Недопустимое значение для ключа'),
            Validator.validEmail(email, 'Недопустимое значение для электронной почты'),
        ];

        const invalidVal = validateValues.find((v) => v !== true);

        if (invalidVal) {
            toast.error(invalidVal);
            return;
        }

        const data = await dispatch(changeEmailRequest({
            token: values.token,
            email,
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        toast.success("Электронная почта изменена");
        navigate('/profile')
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
                                handleSubmit={handleChangeEmail}
                                drawData={drawDataChangePass}
                                handleBack={handleBack}
                                values={values}
                                title='Изменить e-mail'
                            />
                        </div>
                    </section>
                ) : null
            }
        </Wrapper>
    );
}

export default ChangeEmailStep2;
