import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";

function AsideItem(props) {
    const {category, handleClickCategory, activeCategory} = props;

    return (
        <li
            className={classNames(
                'filters__link btn__bg',
                {active: +activeCategory === +category.id}
            )}
            onClick={() => handleClickCategory(category.id)}
        >
            {category.name}
        </li>
    );
}

AsideItem.propTypes = {
    activeCategory: PropTypes.any,
    category: PropTypes.object.isRequired,
    handleClickCategory: PropTypes.func.isRequired,
}

export default AsideItem;
