import React, {useCallback, useState} from 'react';
import Form from "../components/Form";
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getKeyRequest} from "../store/actions/user";
import _ from "lodash";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";

const drawDataGetKey = [
    {
        label: 'Email',
        path: 'email',
    },
    {
        label: 'Back',
        path: 'back',
    },
    {
        label: 'Get key',
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
            pageName='Change password step 1'
        >
            <section className="login">
                <div className="container">
                    <h1 className="login__title">Get key from your email</h1>
                    <Form
                        handleChangeValues={handleChangeValues}
                        handleSubmit={handleGetKey}
                        drawData={drawDataGetKey}
                        handleBack={handleBack}
                        values={values}
                    />
                </div>
            </section>
        </Wrapper>
    );
}

export default ChangePasswordStep1;
