import React from 'react';
import PropTypes from "prop-types";

const {REACT_APP_API_URL} = process.env;

function BranchImage(props) {
    const {image} = props;

    return (
        <figure
            className='branch__fig'
        >
            <img
                src={`${REACT_APP_API_URL}/${image.name}`}
                alt="Image"
                className="branch__img"/>
        </figure>
    );
}

BranchImage.propTypes = {
    image: PropTypes.object.isRequired,
}

export default BranchImage;
