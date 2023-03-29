import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFooterRequest} from "../store/actions/footer";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import _ from 'lodash';

const {REACT_APP_API_URL} = process.env;

function Footer() {
    const dispatch = useDispatch();
    const footer = useSelector(state => state.footer.footer);

    useEffect(() => {
        (async () => {
            const data = await dispatch(getFooterRequest());

            if (!_.isEmpty(data.payload) && (data.payload.status === 'error' || data.payload.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    return (
        <footer className="footer">
            {
                !_.isEmpty(footer) ? (
                    <div className="container">
                        {
                            !_.isEmpty(footer.social) ? (
                                <div className="footer__social">
                                    {
                                        footer.social.map(social => (
                                            <a
                                                href={social.link}
                                                key={social.id}
                                                className="footer__social__item"
                                                target='_blank'
                                            >
                                                <img src={`${REACT_APP_API_URL}/${social.imagePath}`} alt="Icon"
                                                     className="footer__social__icon"/>
                                            </a>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                        {
                            footer.socialMediaTitle ? (
                                <h3 className="footer__title">
                                    {footer.socialMediaTitle}
                                </h3>
                            ) : null
                        }
                        {
                            footer.copyright ? (
                                <p className="footer__copy">
                                    {footer.copyright}
                                </p>
                            ) : null
                        }
                    </div>
                ) : null
            }
        </footer>
    );
}

export default Footer;
