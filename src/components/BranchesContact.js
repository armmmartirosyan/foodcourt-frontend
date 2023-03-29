import React from 'react';
import _ from 'lodash';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function BranchesContact(props) {
    const {branches} = props;

    return (
        <div className="contact">
            <h3 className="branches__title">Связаться с нами</h3>
            <div className="container">
                {
                    !_.isEmpty(branches) ? (
                        branches.map((branch) => (
                            <div
                                className="contact__item"
                                key={branch.id}
                            >
                                <p className="contact__item__text">
                                    <FontAwesomeIcon icon={faPhone} className='contact__item__location'/>
                                    {`+${branch.phoneNum}`}
                                </p>
                                <p className="contact__item__text">
                                    <FontAwesomeIcon icon={faLocationDot} className='contact__item__location'/>
                                    {branch.location}
                                </p>
                            </div>
                        ))
                    ) : null
                }
            </div>
        </div>
    );
}

BranchesContact.propTypes = {
    branches: PropTypes.array.isRequired,
}

export default BranchesContact;
