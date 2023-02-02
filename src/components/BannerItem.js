import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";

const {REACT_APP_API_URL} = process.env;

function BannerItem(props) {
    const {slide} = props;

    return (
        <article className="banner__item">
            <figure className="banner__background">
                <img
                    src={`${REACT_APP_API_URL}/${slide.imagePath}`}
                    alt="Back"
                    className="banner__background__img"
                />
            </figure>
            <div className="container">
                {
                    !_.isEmpty(slide) && slide.title ? (
                        <h1 className="banner__title">
                            {slide.title}
                        </h1>
                    ) : null
                }
                {
                    !_.isEmpty(slide) && slide.description ? (
                        <p className="banner__desc">
                            {slide.description}
                        </p>
                    ) : null
                }
            </div>
        </article>
    );
}

BannerItem.propTypes = {
    slide: PropTypes.object.isRequired,
}

export default BannerItem;
