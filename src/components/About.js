import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import {getAboutRequest} from "../store/actions/about";
import AOS from "aos";
import "aos/dist/aos.css";
import {getBranchesListRequest} from "../store/actions/branches";
import Carousel from "nuka-carousel"

const {REACT_APP_API_URL} = process.env;

function AboutText() {
    const dispatch = useDispatch();
    const about = useSelector(state => state.about.about);
    const branchesList = useSelector(state => state.branches.branchesList);

    useEffect(() => {
        AOS.init();

        (async () => {
            const data = await dispatch(getAboutRequest());

            if (!_.isEmpty(data.payload) && (data.payload.status === 'error' || data.payload.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                return;
            }

            const dataBranches = await dispatch(getBranchesListRequest());

            if (!_.isEmpty(dataBranches.payload) && (dataBranches.payload?.status === 'error' || dataBranches.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(dataBranches.payload.message)));
            }
        })()
    }, []);

    const images = useMemo(() => {
        if(!_.isEmpty(branchesList)){
            return branchesList[0].images
        }
    }, [branchesList]);

    return (
        <>
            {
                !_.isEmpty(about) ? (
                    <section
                        className="about"
                        data-aos="flip-up"
                        data-aos-duration="300"
                    >
                        <div className="container">
                            <p className="about__title">{about.title}</p>
                            <pre className="about__description">{about.description}</pre>
                            {
                                !_.isEmpty(images) ? (
                                    <div className="about__slider">
                                        <Carousel
                                            data-aos="fade-up"
                                            renderCenterLeftControls={() => null}
                                            renderCenterRightControls={() => null}
                                            dragThreshold={0.1}
                                            wrapAround={false}
                                            autoplay={true}
                                            autoplayInterval={6000}
                                            speed={800}
                                        >
                                            {
                                                !_.isEmpty(images) ? (
                                                    images.map(image => (
                                                        <figure
                                                            className="about__fig"
                                                            key={image.name}
                                                        >
                                                            <img
                                                                src={`${REACT_APP_API_URL}/${image.name}`}
                                                                alt={image.name}
                                                                className="about__img"
                                                            />
                                                        </figure>
                                                    ))
                                                ) : null
                                            }
                                        </Carousel>
                                    </div>
                                ) : null
                            }
                        </div>
                    </section>
                ) : null
            }
        </>
    );
}

export default AboutText;
