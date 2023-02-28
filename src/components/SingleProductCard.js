import React from 'react';
import QuantityControl from "./QuantityControl";
import PropTypes from "prop-types";

const {REACT_APP_API_URL} = process.env;

function SingleProductCard(props) {
    const {product} = props;

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
                    <h1 className="single__card__title">{product.title}</h1>
                    <p className="single__card__desc">
                        {product.description}
                    </p>
                    <p className="single__card__price">
                        {`${product.price}AMD`}
                    </p>
                </div>
                <QuantityControl
                    productId={product.id}
                    price={product.price}
                    allowAdd={true}
                    isRow={true}
                />
            </div>
        </article>
    );
}

SingleProductCard.propTypes = {
    product: PropTypes.object.isRequired,
}

export default SingleProductCard;
