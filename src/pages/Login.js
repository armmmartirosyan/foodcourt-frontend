import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {loginRequest} from "../store/actions/user";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import Form from "../components/Form";
import {useNavigate} from "react-router-dom";
import Account from "../helpers/Account";

const drawData = [
    {
        label: 'Email',
        path: 'email',
    },
    {
        label: 'Password',
        path: 'password',
    },
    {
        label: 'Remember?',
        path: 'remember',
    },
    {
        label: 'Login',
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
        if (Account.getToken()) {
            navigate('/');
        }
    }, []);

    const handleChangeValues = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    }, [values]);

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            toast.error('Error');
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

        navigate("/");
        window.location.reload();
    }, [values]);

    return (
        <Wrapper
            statuses={{loginStatus}}
            pageName='Login'
        >
            <section className="login">
                <div className="container">
                    <h1 className="login__title">Login</h1>
                    <Form
                        handleChangeValues={handleChangeValues}
                        handleSubmit={handleLogin}
                        drawData={drawData}
                        values={values}
                    />
                    <button
                        className="login__forgot"
                        onClick={() => {
                            navigate('/change-password-step-1')
                        }}
                    >
                        Forgot password?
                    </button>
                </div>
            </section>
        </Wrapper>
    );
}

export default Login;
