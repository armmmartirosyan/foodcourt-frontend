import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getCurrentAccountRequest, modifyProfileRequest} from "../store/actions/user";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import Account from "../helpers/Account";
import {useNavigate} from "react-router-dom";
import {getPaymentTypesRequest} from "../store/actions/paymentTypes";
import Form from "../components/Form";
import Validator from "../helpers/Validator";

const drawData = [
    {
        label: 'Имя',
        path: 'firstName',
        disabled: false
    },
    {
        label: 'Электронная почта',
        path: 'email',
        disabled: true
    },
    {
        label: 'Номер телефона',
        path: 'phoneNum',
        disabled: false
    },
    {
        label: 'Сохранить',
        path: 'submit',
    },
];

function Profile() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const currentUserStatus = useSelector(state => state.status.userGetCurrentStatus);
    const modifyUserStatus = useSelector(state => state.status.userModifyStatus);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: '',
        email: '',
        phoneNum: '',
    });

    useEffect(() => {
        if(!Account.getToken()) navigate('/');

        (async () => {
            const account = await dispatch(getCurrentAccountRequest());
            const data = await dispatch(getPaymentTypesRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                return;
            }

            const paymentTypes = data?.payload?.paymentTypes || [];
            const allowUse = paymentTypes.map(payment => payment.allowUse);

            if(_.isEmpty(paymentTypes) || !allowUse.includes('t')) navigate('/');

            const {email, firstName, phoneNum} = account.payload.user;
            setValues({
                phoneNum: `+${phoneNum}`,
                email,
                firstName,
            })
        })()
    }, []);

    const handleChangeValues = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value,
        })
    }, [values]);

    const handleModifyProfile = useCallback(async (e) => {
        e.preventDefault();

        const validateValues = [
            Validator.validString(values.firstName, 'Недопустимое значение для имени'),
            Validator.validPhoneNum(values?.phoneNum?.replace("+", ""), 'Недопустимое значение для номера телефона'),
        ];

        const invalidVal = validateValues.find((v) => v !== true);

        if (invalidVal) {
            toast.error(invalidVal);
            return;
        }

        const data = await dispatch(modifyProfileRequest({
            firstName: values.firstName,
            phoneNum: values.phoneNum.replace("+", ""),
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            return;
        }
        toast.success('Сохранено');
    }, [values]);

    return (
        <Wrapper
            statuses={{currentUserStatus, modifyUserStatus}}
            pageName='Профиль'
            hasFooter={false}
        >
            <section className="account">
                {
                    !_.isEmpty(user) ? (
                        <div className="container">
                            <Form
                                handleChangeValues={handleChangeValues}
                                handleSubmit={handleModifyProfile}
                                drawData={drawData}
                                values={values}
                                title='Профиль'
                            />
                        </div>
                    ) : null
                }
            </section>
        </Wrapper>
    );
}

export default Profile;
