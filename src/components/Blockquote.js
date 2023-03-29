import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Carousel from "nuka-carousel";
import {useDispatch, useSelector} from "react-redux";
import {addCommentRequest, getCommentsRequest} from "../store/actions/comment";
import _ from "lodash";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import AOS from "aos";
import "aos/dist/aos.css";
import Form from "./Form";

const drawData = [
    {
        label: 'Ваш отзыв',
        path: 'text',
        disabled: false
    },
    {
        label: 'Ваше имя',
        path: 'name',
        disabled: false
    },
    {
        label: 'Публиковать',
        path: 'submit',
    },
];

function Blockquote() {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.comments);
    const [comment, setComment] = useState({
        text: '',
        name: '',
    });
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleChangeValues = useCallback((key, value) => {
        setComment({
            ...comment,
            [key]: value,
        })
    }, [comment]);

    const handleAddComment = useCallback(async (e) => {
        e.preventDefault();
        const data = await dispatch(addCommentRequest({
            comment: comment.text,
            name: comment.name
        }));

        if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
            toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            return;
        }

        toast.success('Комментария успешно опубликован');
        setComment({
            text: '',
            name: '',
        });
    }, [comment]);

    useEffect(() => {
        AOS.init();

        (async () => {
            const data = await dispatch(getCommentsRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()

        function updateSize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const carouselItemCount = useMemo(() => {
        if(screenWidth > 1000 && comments.length >= 3){
            return 3;
        }else if(comments.length >= 2 && screenWidth > 535){
            return 2;
        }else {
            return 1;
        }
        //screenWidth > 1000 ? 3 : screenWidth <= 535 ? 1 : 2
    }, [screenWidth, comments]);

    return (
        <section
            className='comment__wrapper'
            data-aos="fade-up"
            data-aos-duration="300"
        >
            {
                !_.isEmpty(comments) ? (
                    <>
                        <h1 className="comment__header">Что люди говорят о нас</h1>
                        <Carousel
                            renderBottomCenterControls={() => null}
                            renderCenterLeftControls={() => null}
                            renderCenterRightControls={() => null}
                            dragThreshold={0.1}
                            wrapAround={false}
                            autoplay={false}
                            speed={800}
                            slidesToShow={carouselItemCount}
                        >
                            {
                                comments.map(tempComment => (
                                    <blockquote
                                        className="comment"
                                        key={tempComment.id}
                                    >
                                        <div className='comment__text__container'>
                                            <p className="comment__text">
                                                {`“${tempComment.comment}”`}
                                            </p>
                                        </div>
                                        <p className="comment__name">
                                            {tempComment.name}
                                        </p>
                                    </blockquote>
                                ))
                            }
                        </Carousel>
                    </>
                ) : null
            }

            <section className="blockquote">
                <div className="container">
                    <p className="blockquote__description">
                        Оставить отзыв
                    </p>
                    <Form
                        handleChangeValues={handleChangeValues}
                        handleSubmit={handleAddComment}
                        drawData={drawData}
                        values={comment}
                    />
                </div>
            </section>
        </section>
    );
}

export default Blockquote;
