import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const {REACT_APP_API_URL} = process.env;

function OfferCard(props) {
    const {offer} = props;

    return (
        <article className="offers__card">
            <Link to={`/product/${offer.slugName}`} className="offers__card__link">
                <figure className="offers__card__fig">
                    <img
                        src={`${REACT_APP_API_URL}/${offer.imagePath}`}
                        alt="Image"
                        className="offers__card__img"
                    />
                </figure>
                <div className="offers__card__box">
                    <h1 className="offers__card__title">{offer.title}</h1>
                    <p className="offers__card__price">{`${offer.price}RUR`}</p>
                </div>
            </Link>
        </article>
    );
}

OfferCard.propTypes = {
    offer: PropTypes.object.isRequired,
}

export default OfferCard;
