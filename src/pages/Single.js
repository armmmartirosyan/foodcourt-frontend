import React, {useEffect, useMemo, useState} from 'react';
import Wrapper from "../components/Wrapper";
import SingleProductCard from "../components/SingleProductCard";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getProductsByCatRequest, getProductsListRequest, getSingleProductRequest} from "../store/actions/products";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import {getPaymentTypesRequest} from "../store/actions/paymentTypes";
import Carousel from "nuka-carousel";
import ProductCard from "../components/ProductCard";

function Single() {
    const dispatch = useDispatch();
    const params = useParams();
    const singleProduct = useSelector(state => state.products.singleProduct);
    const productsList = useSelector(state => state.products.productsListByCat);
    const singleProductStatus = useSelector(state => state.status.productsGetSingleStatus);
    const productsByCatStatus = useSelector(state => state.status.productsGetByCatStatus);
    const [allowBuy, setAllowBuy] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function updateSize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        if (params.slugName) {
            (async () => {
                const data = await dispatch(getSingleProductRequest({slugName: params.slugName}));

                if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                    toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                    return;
                }

                const dataPayment = await dispatch(getPaymentTypesRequest());

                if (!_.isEmpty(dataPayment.payload) && (dataPayment.payload?.status === 'error' || dataPayment.payload?.status !== 'ok')) {
                    toast.error(_.capitalize(Helper.clearAxiosError(dataPayment.payload.message)));
                    return;
                }

                const paymentTypes = dataPayment?.payload?.paymentTypes || [];
                const allowUse = paymentTypes.map(payment => payment.allowUse);

                setAllowBuy(!(_.isEmpty(paymentTypes) || !allowUse.includes('t')));
            })()
        }
    }, [params.slugName]);

    useEffect(() => {
        if(!_.isEmpty(singleProduct)){
            const categorySlug = singleProduct?.categories[0]?.slugName;
            (async () => {
                const data = await dispatch(getProductsByCatRequest({
                    categorySlug,
                    productId: singleProduct.id,
                }));

                if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                    toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                }
            })()
        }
    }, [singleProduct]);

    const carouselItemCount = useMemo(() => {
        if(screenWidth > 1000 && productsList?.length >= 3){
            return 3;
        }else if(productsList?.length >= 2 && screenWidth > 535){
            return 2;
        }else {
            return 1;
        }
    }, [screenWidth, productsList]);

    return (
        <Wrapper
            statuses={{singleProductStatus, productsByCatStatus}}
            pageName={`Product ${!_.isEmpty(singleProduct) ? singleProduct.title : ''}`}
        >
            {
                !_.isEmpty(singleProduct) ? (
                    <section className="single">
                        <div className="container">
                            <h1 className="single__title">{singleProduct.title}</h1>
                            <SingleProductCard
                                product={singleProduct}
                                allowBuy={allowBuy}
                            />
                        </div>
                    </section>
                ) : null
            }
            {
                !_.isEmpty(productsList) ? (
                    <section className="single__suggestion">
                        <h1 className="single__suggestion__title">Похожие продукты</h1>
                        <Carousel
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
                            wrapAround={false}
                            autoplay={false}
                            speed={800}
                            slidesToShow={carouselItemCount}
                        >
                            {
                                productsList.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        allowBuy={allowBuy}
                                        className='slide__product'
                                    />
                                ))
                            }
                        </Carousel>
                    </section>
                ) : null
            }
        </Wrapper>
    );
}

export default Single;
