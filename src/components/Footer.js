import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGooglePlusG, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                {/*<h3 className="footer__title">
                    Feel free to check our social media pages
                </h3>
                <div className="footer__social">
                    <Link to='/' className="footer__social__item">
                        <FontAwesomeIcon icon={faFacebookF} className="footer__social__icon"/>
                    </Link>
                    <Link to='/'  className="footer__social__item">
                        <FontAwesomeIcon icon={faTwitter} className="footer__social__icon"/>
                    </Link>
                    <Link to='/'  className="footer__social__item">
                        <FontAwesomeIcon icon={faGooglePlusG} className="footer__social__icon"/>
                    </Link>
                    <Link to='/'  className="footer__social__item">
                        <FontAwesomeIcon icon={faYoutube} className="footer__social__icon"/>
                    </Link>
                </div>*/}
                <p className="footer__copy">
                    &copy; 2023 - All Right Reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
