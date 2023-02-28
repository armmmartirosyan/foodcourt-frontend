import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Form from "../components/Form";
import Wrapper from "../components/Wrapper";
import {registerRequest} from "../store/actions/user";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import {useNavigate} from "react-router-dom";

const drawData = [
    {
        label: 'First Name',
        path: 'firstName',
    },
    {
        label: 'Last Name',
        path: 'lastName',
    },
    {
        label: 'Email',
        path: 'email',
    },
    {
        label: 'Password',
        path: 'password',
    },
    {
        label: 'Confirm Password',
        path: 'confirmPassword',
    },
    {
        label: 'Phone Number',
        path: 'phoneNum',
    },
    {
        label: 'Register',
        path: 'submit',
    },
];

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerUserStatus = useSelector(state => state.status.userRegisterStatus);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNum: '',
    });

    const handleChangeValues = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    }, [values]);

    const handleRegister = useCallback(async (e) => {
        e.preventDefault();
        //todo stugumner

        const data = await dispatch(registerRequest({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            phoneNum: values.phoneNum.replace("+", ""),
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            return;
        }

        toast.success(`User ${values.firstName} ${values.lastName} registered successfully.`);
        navigate('/login');
    }, [values]);

    return (
        <Wrapper
            statuses={{registerUserStatus}}
            pageName='Register'
        >
            <section className="login">
                <div className="container">
                    <h1 className="login__title">Register</h1>
                    <Form
                        handleSubmit={handleRegister}
                        handleChangeValues={handleChangeValues}
                        values={values}
                        drawData={drawData}
                    />
                </div>
            </section>
        </Wrapper>
    );
}

export default Register;
