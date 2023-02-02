import React from 'react';
import QuantityControl from "./QuantityControl";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const {REACT_APP_API_URL} = process.env;

function ProductCard(props) {
    const {product} = props;

    return (
        <article className="products__card">
            <Link to={`/product/${product.slugName}`} className='products__card__link'>
                <figure className="products__card__fig">
                    <img
                        src={`${REACT_APP_API_URL}/${product.imagePath}`}
                        alt="products"
                        className="products__card__img"
                    />
                </figure>
                <div className="products__card__data">
                    <h1 className="products__card__title">{product.title}</h1>
                    <p className="products__card__desc">
                        {product.description}
                    </p>
                    <p className="products__card__price">
                        {`${product.price}RUR`}
                    </p>
                </div>
            </Link>
            <QuantityControl
                productId={product.id}
                price={product.price}
            />
        </article>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductCard;
