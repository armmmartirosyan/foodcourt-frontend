import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";
import Loading from "./Loading";
import _ from "lodash";
import {Helmet} from "react-helmet";

function Wrapper(props) {
    const {children = {}, statuses, pageName, hasFooter = true} = props;
    const [status, setStatus] = useState('');

    useEffect(() => {
        setStatus(Object.values(statuses || {}));
    }, [statuses]);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
        <div className='wrapper'>
            <Helmet>
                <title>{_.startCase(pageName)}</title>
            </Helmet>
            <Header/>
            {children}
            {hasFooter && <Footer/>}
            {
                status.includes('pending') ? (
                    <Loading/>
                ) : null
            }
        </div>
    );
}

Wrapper.propTypes = {
    statuses: PropTypes.object,
    children: PropTypes.any,
    pageName: PropTypes.string.isRequired,
}

export default Wrapper;
