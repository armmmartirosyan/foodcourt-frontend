import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getCurrentAccountRequest, modifyProfileRequest} from "../store/actions/user";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import AccountTableRow from "../components/AccountTableRow";
import AccountModifyForm from "../components/AccountModifyForm";
import Account from "../helpers/Account";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const currentUserStatus = useSelector(state => state.status.userGetCurrentStatus);
    const modifyUserStatus = useSelector(state => state.status.userModifyStatus);
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        key: '',
        value: '',
        name: '',
    });

    useEffect(() => {
        (async () => {
            const data = await dispatch(getCurrentAccountRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            }
        })()
    }, []);

    const handleClickRow = useCallback((name, key, value) => {
        setValue({
            name,
            key,
            value,
        });
    }, []);

    const handleChangeValue = useCallback((val) => {
        setValue({
            ...value,
            value: val,
        });
    }, [value]);

    const handleModifyProfile = useCallback(async (e) => {
        e.preventDefault();
        let modifyValue = value.value;

        if (value.key === 'phoneNum') {
            modifyValue = modifyValue.replace("+", "");
        }

        const data = await dispatch(modifyProfileRequest({
            [value.key]: modifyValue
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            return;
        }

        await dispatch(getCurrentAccountRequest());
        setValue({
            key: '',
            value: '',
            name: '',
        });
    }, [value]);

    const handleBack = useCallback((e) => {
        e.preventDefault();
        setValue({
            key: '',
            value: '',
            name: '',
        });
    }, []);

    const handleLogout = useCallback((e) => {
        e.preventDefault();

        Account.deleteToken();
        navigate('/');
    }, []);

    const drawData = [
        {
            label: 'First Name',
            path: 'firstName',
            editable: true
        },
        {
            label: 'Last Name',
            path: 'lastName',
            editable: true
        },
        {
            label: 'Email',
            path: 'email',
            editable: true
        },
        {
            label: 'Phone Number',
            path: 'phoneNum',
            editable: true
        },
    ];

    return (
        <Wrapper
            statuses={{currentUserStatus, modifyUserStatus}}
            pageName='Profile'
        >
            <section className="account">
                {
                    !_.isEmpty(user) ? (
                        <>
                            <h1 className='account__title'>
                                {`${user.firstName}'s profile`}
                            </h1>
                            {
                                !value.key ? (
                                    <div className="container">
                                        <div className="account__table">
                                            {
                                                drawData.map(item => (
                                                    <AccountTableRow
                                                        key={item.path}
                                                        item={item}
                                                        user={user}
                                                        editable={item.editable}
                                                        handleClickRow={handleClickRow}
                                                    />
                                                ))
                                            }
                                        </div>
                                        <button
                                            className="login__form__submit btn__bg"
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                ) : null
                            }
                        </>
                    ) : null
                }
                {
                    value.key ? (
                        <AccountModifyForm
                            value={value}
                            handleChangeValue={handleChangeValue}
                            handleBack={handleBack}
                            handleModifyProfile={handleModifyProfile}
                        />
                    ) : null
                }
            </section>
        </Wrapper>
    );
}

export default Profile;
