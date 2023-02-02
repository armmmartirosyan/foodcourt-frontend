import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

function AsideItem(props) {
    const {category} = props;

    return (
        <li className="aside__item">
            <NavLink
                to={`/menu/${category.slugName}`}
                className="aside__link"
            >
                {category.name}
            </NavLink>
        </li>
    );
}

AsideItem.propTypes = {
    category: PropTypes.object.isRequired,
}

export default AsideItem;
