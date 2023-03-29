import React from 'react';
import QuantityControl from "./QuantityControl";
import PropTypes from "prop-types";
import Price from "../helpers/Price";

const {REACT_APP_API_URL} = process.env;

function SingleProductCard(props) {
    const {product, allowBuy = false} = props;

    return (
        <article className="single__card">
            <figure className="single__card__fig">
                <img
                    src={`${REACT_APP_API_URL}/${product.imagePath}`}
                    alt="single"
                    className="single__card__img"
                />
            </figure>
            <div className='single__card__container'>
                <div className="single__card__data">
                    <p className="single__card__desc">
                        {product.description}
                    </p>
                    <p className="single__card__price">
                        {`${Price.price(product.price)} RUB`}
                    </p>
                </div>
                {
                    allowBuy ? (
                        <QuantityControl
                            productId={product.id}
                            price={product.price}
                            allowAdd={true}
                            // isRow={true}
                        />
                    ) : null
                }
            </div>
        </article>
    );
}

SingleProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    allowBuy: PropTypes.bool,
}

export default SingleProductCard;
