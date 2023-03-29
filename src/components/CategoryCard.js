import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const {REACT_APP_API_URL} = process.env;

function CategoryCard(props) {
    const {category} = props;

    return (
        <article className="categories__card">
            <Link to={`/menu?category=${category.id}`} className="categories__card__link">
                <figure className="categories__card__fig">
                    <img
                        src={`${REACT_APP_API_URL}/${category.imagePath}`}
                        alt="Image"
                        className="categories__card__img"
                    />
                </figure>
                <h1 className="categories__card__title">{category.name}</h1>
            </Link>
        </article>
    );
}

CategoryCard.propTypes = {
    category: PropTypes.object.isRequired,
}

export default CategoryCard;
