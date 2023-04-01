import React from 'react';
import QuantityControl from "./QuantityControl";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Price from "../helpers/Price";
import Helper from "../helpers/Helper";

const {REACT_APP_API_URL} = process.env;

function ProductCard(props) {
    const {product, allowBuy = false, className} = props;

    return (
        <article className={`products__card ${className}`}>
            <Link to={`/product/${product.slugName}`}  className="products__card__title">
                <h1>{Helper.shortTxt(product.title, 30)}</h1>
            </Link>
            <Link to={`/product/${product.slugName}`} className='products__card__link'>
                <figure className="products__card__fig">
                    <img
                        src={`${REACT_APP_API_URL}/${product.imagePath}`}
                        alt="products"
                        className="products__card__img"
                    />
                </figure>
                <p className="products__card__price">
                    {`${Price.price(product.price)} RUB`}
                </p>
            </Link>
            <div className='products__card__control__container'>
                {
                    allowBuy ? (
                        <QuantityControl
                            productId={product.id}
                            price={product.price}
                            allowAdd={true}
                        />
                    ) : null
                }
            </div>
        </article>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    allowBuy: PropTypes.bool,
}

export default ProductCard;
