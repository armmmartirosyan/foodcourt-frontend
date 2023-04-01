import React, {useEffect} from 'react';
import Carousel from "nuka-carousel"
import BannerItem from "./BannerItem";
import {useDispatch, useSelector} from "react-redux";
import {getSlidesListRequest} from "../store/actions/slides";
import _ from "lodash";
import Helper from "../helpers/Helper";
import {toast} from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

function Banner() {
    const dispatch = useDispatch();
    const slidesList = useSelector(state => state.slides.slidesList);

    useEffect(() => {
        AOS.init();

        (async () => {
            const data = await dispatch(getSlidesListRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    return (
        <>
            {
                !_.isEmpty(slidesList) ? (
                    <section
                        className="banner"
                        data-aos="flip-up"
                        data-aos-duration="300"
                    >
                        <Carousel
                            data-aos="fade-up"
                            renderBottomCenterControls={() => null}
                            renderCenterLeftControls={({previousDisabled, previousSlide}) => (
                                <button
                                    onClick={previousSlide}
                                    disabled={previousDisabled}
                                    className='banner__controls left'
                                >
                                    {"<"}
                                </button>
                            )}
                            renderCenterRightControls={({nextDisabled, nextSlide}) => (
                                <button
                                    onClick={nextSlide}
                                    disabled={nextDisabled}
                                    className='banner__controls right'
                                >
                                    {">"}
                                </button>
                            )}
                            dragThreshold={0.1}
                            wrapAround={true}
                            autoplay={true}
                            autoplayInterval={6000}
                            speed={800}
                        >
                            {
                                !_.isEmpty(slidesList) ? (
                                    slidesList.map(slide => (
                                        <BannerItem
                                            key={slide.id}
                                            slide={slide}
                                        />
                                    ))
                                ) : null
                            }
                        </Carousel>
                    </section>
                ) : null
            }
        </>
    );
}

export default Banner;
