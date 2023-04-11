import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import _ from 'lodash';
import HeaderItem from "./HeaderItem";
import Account from "../helpers/Account";
import {getPaymentTypesRequest} from "../store/actions/paymentTypes";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import {useDispatch} from "react-redux";
import {faBars, faArrowRightToBracket, faUser, faBasketShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {useOutsideClick} from "../helpers/useOutsideClick";
import {deleteProfileRequest} from "../store/actions/user";
import AccountDeleteModal from "./AccountDeleteModal";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allowBuy, setAllowBuy] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showBars, setShowBars] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        (async () => {
            const data = await dispatch(getPaymentTypesRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                return;
            }

            const paymentTypes = data?.payload?.paymentTypes || [];
            const allowUse = paymentTypes.map(payment => payment.allowUse);

            if(_.isEmpty(paymentTypes) || !allowUse.includes('t')) return setAllowBuy(false);

            setAllowBuy(true);
        })()

        function updateSize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleClickBars = useCallback(() => {
        setShowBars(prevState => !prevState);
    }, []);

    const handleLogout = useCallback((e) => {
        e.preventDefault();
        Account.deleteToken();
        window.location.href = "/";
    }, []);

    const handleOpenCloseModal = useCallback(() => {
        setShowModal(prevState => !prevState);
    }, []);

    const handelDelAccount = useCallback(async () => {
        const data = await dispatch(deleteProfileRequest());

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload?.message)));
            return;
        }

        Account.deleteToken();
        window.location.href = "/";
    }, []);

    useOutsideClick(headerRef, () => {
        if(screenWidth < 768 && showBars) handleClickBars()
    });

    const drawHeader = [
        {
            label: 'Главная',
            path: '/',
            show: true,
            icon: null,
            subheader: null,
        },
        {
            label: 'Меню',
            path: '/menu',
            show: true,
            icon: null,
            subheader: null,
        },
        {
            label: 'О нас',
            path: '/about',
            show: true,
            icon: null,
            subheader: null,
        },
        {
            label: 'Регистрация',
            path: '/register',
            show: allowBuy,
            icon: null,
            subheader: null,
        },
        {
            label: 'Корзина',
            path: '/basket',
            show: allowBuy,
            icon: faBasketShopping,
            subheader: null,
        },
        {
            label: 'Вход',
            path: '/login',
            show: !Account.getToken() && allowBuy,
            icon: faArrowRightToBracket,
            subheader: null,
        },
        {
            label: 'Профиль',
            path: '/profile',
            show: Account.getToken() && allowBuy,
            icon: faUser,
            subheader: [
                {
                    label: 'Выйти',
                    func: handleLogout,
                    icon: null,
                },
                {
                    label: 'Забыли пароль?',
                    func: () => navigate('/change-password-step-1'),
                    icon: null,
                },
                {
                    label: 'Изменить e-mail',
                    func: () => navigate('/change-email-step-1'),
                    icon: null,
                },
                {
                    label: 'Удалить аккаунт',
                    func: handleOpenCloseModal,
                    icon: null,
                },
            ],
        },
    ];

    const handleScrollTop = useCallback(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
        <header
            className='header'
            ref={headerRef}
        >
            <div className="container">
                <Link to='/' className='header__logo' onClick={handleScrollTop}>
                    Шашлыков
                </Link>
                {
                    screenWidth <= 768 ? (
                        <div
                            className='header__bars'
                            onClick={handleClickBars}
                        >
                            <FontAwesomeIcon icon={faBars} className="header__bars__icon"/>
                        </div>
                    ) : null
                }
                {
                    !_.isEmpty(drawHeader) ? (
                        <nav className={classNames(
                            'header__nav',
                            {active__nav: screenWidth <= 768 && showBars}
                        )}>
                            {
                                drawHeader.map(item => (
                                    <HeaderItem
                                        key={item.label}
                                        item={item}
                                        handleScrollTop={handleScrollTop}
                                    />
                                ))
                            }
                        </nav>
                    ) : null
                }
            </div>
            {
                showModal ? (
                    <AccountDeleteModal
                        showModal={showModal}
                        onClose={handleOpenCloseModal}
                        onAgree={handelDelAccount}
                    />
                ) : null
            }
        </header>
    );
}

export default Header;
