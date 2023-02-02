import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBasketShopping} from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';
import HeaderItem from "./HeaderItem";
import Account from "../helpers/Account";

function Header() {
    const drawHeader = [
        {
            label: 'Home',
            path: '/',
            show: true,
        },
        {
            label: 'Basket',
            path: '/basket',
            show: true,
        },
        {
            label: 'Login',
            path: '/login',
            show: !Account.getToken(),
        },
        {
            label: 'Register',
            path: '/register',
            show: true,
        },
        {
            label: 'Profile',
            path: '/profile',
            show: Account.getToken(),
        },
    ];

    return (
        <header className='header'>
            <div className="container">
                <Link to='/' className='header__logo'>
                    Shashlichni
                </Link>
                {
                    !_.isEmpty(drawHeader) ? (
                        <nav className="header__nav">
                            {
                                drawHeader.map(item => (
                                    <HeaderItem
                                        key={item.label}
                                        item={item}
                                    />
                                ))
                            }
                            {/*<NavLink to='/' className='header__nav__item'>Home</NavLink>*/}
                            {/*<NavLink to='/basket' className='header__nav__item'>*/}
                            {/*    <FontAwesomeIcon icon={faBasketShopping} className="footer__social__icon"/>*/}
                            {/*</NavLink>*/}
                        </nav>
                    ) : null
                }
            </div>
        </header>
    );
}

export default Header;
