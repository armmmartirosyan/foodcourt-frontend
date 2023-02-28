import React, {useCallback, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Form from "../components/Form";
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {changePasswordRequest} from "../store/actions/user";
import _ from "lodash";
import Helper from "../helpers/Helper";

const drawDataChangePass = [
    {
        label: 'Password',
        path: 'password',
    },
    {
        label: 'Confirm password',
        path: 'confirmPassword',
    },
    {
        label: 'Token',
        path: 'token',
    },
    {
        label: 'Back',
        path: 'back',
    },
    {
        label: 'Change password',
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

        const data = await dispatch(changePasswordRequest({
            email: email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            token: values.token
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        toast.success("Password successfully changed.");
        navigate(!_.isEmpty(user) ? `/profile` : `/login`)
    }, [email, values]);

    const handleBack= useCallback((e) => {
        e.preventDefault();

        window.history.back();
    }, []);

    return (
        <Wrapper
            statuses={{changePassStatus}}
            pageName='Change password step 2'
        >
            {
                email ? (
                    <section className="login">
                        <div className="container">
                            <h1 className="login__title">Change password</h1>
                            <Form
                                handleChangeValues={handleChangeValues}
                                handleSubmit={handleChangePassword}
                                drawData={drawDataChangePass}
                                handleBack={handleBack}
                                values={values}
                            />
                        </div>
                    </section>
                ) : null
            }
        </Wrapper>
    );
}

export default ChangePasswordStep2;
