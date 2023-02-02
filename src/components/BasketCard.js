import React from 'react';
import PropTypes from "prop-types";

const {REACT_APP_API_URL} = process.env;

function BasketCard(props) {
    const {item, handleRemove} = props;

    return (
        <article className="basket__card">
            <figure className="basket__card__fig">
                <img
                    src={`${REACT_APP_API_URL}/${item.product.imagePath}`}
                    alt="Image"
                    className="basket__card__img"
                />
            </figure>
            <div className="basket__card__box">
                <h1 className="basket__card__title">{item.product.title}</h1>
                <p className="basket__card__price">
                    {`${item.quantity} x ${item.product.price}RUR`}
                </p>
            </div>
            <button
                className="basket__card__del"
                onClick={() => {
                    handleRemove(item.id)
                }}
            >
                x
            </button>
        </article>
    );
}

BasketCard.propTypes = {
    item: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired,
}

export default BasketCard;
