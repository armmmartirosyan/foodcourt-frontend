import React from 'react';
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";

function PageNumbers(props) {
    const {totalPages, currentPage, handleClickPage} = props;

    return (
        <div className="pages">
            <button
                className="pages__btn btn__danger left__btn"
                onClick={() => handleClickPage(currentPage !== 1 ? currentPage - 1 : currentPage)}
            >
                <FontAwesomeIcon icon={faAngleLeft} className='pages__arrow left__arrow'/>
                Назад
            </button>
            <p className="pages__count">
                {`${currentPage} из ${totalPages}`}
            </p>
            <button
                className="pages__btn btn__danger right__btn"
                onClick={() => handleClickPage(currentPage !== totalPages ? currentPage + 1 : currentPage)}
            >
                Следующий
                <FontAwesomeIcon icon={faAngleRight} className='pages__arrow right__arrow'/>
            </button>
        </div>
    );
}

PageNumbers.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handleClickPage: PropTypes.func.isRequired,
}
export default PageNumbers;
