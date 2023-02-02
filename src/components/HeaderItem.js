import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function HeaderItem(props) {
    const {item} = props;

    return (
        <>
            {
                item.show ? (
                    <NavLink to={item.path} className='header__nav__item'>
                        {item.label}
                    </NavLink>
                ) : null
            }
        </>
    );
}

HeaderItem.propTypes = {
    item: PropTypes.object.isRequired,
}

export default HeaderItem;
