import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function HeaderItem(props) {
    const {item} = props;

    return (
        <>
            {
                item.show ? (
                    <div className='header__nav__item__container'>
                        <NavLink to={item.path} className='header__nav__item'>
                            {item.icon ? <FontAwesomeIcon icon={item.icon} className="header__nav__item__icon"/> : item.label}
                        </NavLink>
                        {
                            item.subheader ? (
                                <ul className='header__nav__sub'>
                                    {
                                        item.subheader.map(subItem => (
                                            <li
                                                onClick={subItem.func}
                                                key={subItem.label}
                                                className='header__nav__sub__item'
                                            >
                                                {subItem.label}
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : null
                        }
                    </div>
                ) : null
            }
        </>
    );
}

HeaderItem.propTypes = {
    item: PropTypes.object.isRequired,
}

export default HeaderItem;
