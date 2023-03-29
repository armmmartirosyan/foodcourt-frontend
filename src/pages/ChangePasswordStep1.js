import React, {useCallback, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getKeyRequest} from "../store/actions/user";
import _ from "lodash";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import Form from "../components/Form";
import Validator from "../helpers/Validator";

const drawDataGetKey = [
    {
        label: 'Электронная почта',
        path: 'email',
    },
    {
        label: 'Назад',
        path: 'back',
    },
    {
        label: 'Получить ключ',
        path: 'submit',
    },
];

function ChangePasswordStep1() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getKeyStatus = useSelector(state => state.status.userGetKeyStatus);
    const [values, setValues] = useState({
        email: '',
    });

    const handleChangeValues = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    }, [values]);

    const handleGetKey = useCallback(async (e) => {
        e.preventDefault();

        const validateValues = [
            Validator.validEmail(values.email, 'Недопустимое значение для электронной почты'),
        ];

        const invalidVal = validateValues.find((v) => v !== true);

        if (invalidVal) {
            toast.error(invalidVal);
            return;
        }

        const data = await dispatch(getKeyRequest({
            email: values.email,
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        navigate(`/change-password-step-2/${values.email}`);
    }, [values]);

    const handleBack= useCallback((e) => {
        e.preventDefault();
        window.history.back();
    }, []);

    return (
        <Wrapper
            statuses={{getKeyStatus}}
            pageName='Изменить пароль шаг 1'
            hasFooter={false}
        >
            <section className="login">
                <div className="container">
                    <Form
                        handleChangeValues={handleChangeValues}
                        handleSubmit={handleGetKey}
                        drawData={drawDataGetKey}
                        handleBack={handleBack}
                        values={values}
                        title='Получить ключ на почту'
                    />
                </div>
            </section>
        </Wrapper>
    );
}

export default ChangePasswordStep1;
