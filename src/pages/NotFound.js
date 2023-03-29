import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPager} from "@fortawesome/free-solid-svg-icons";
import {Helmet} from "react-helmet";

function NotFound() {
    return (
        <div className='empty_page'>
            <Helmet>
                <title>Страница не найдена</title>
            </Helmet>
            <FontAwesomeIcon icon={faPager} />
            <p>Страница не найдена</p>
        </div>
    );
}

export default NotFound;
