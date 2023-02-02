import React, {useEffect} from 'react';
import Wrapper from "../components/Wrapper";
import SingleProductCard from "../components/SingleProductCard";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getSingleProductRequest} from "../store/actions/products";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";

function Single() {
    const dispatch = useDispatch();
    const params = useParams();
    const singleProduct = useSelector(state => state.products.singleProduct);
    const singleProductStatus = useSelector(state => state.status.productsGetSingleStatus);

    useEffect(() => {
        if (params.slugName) {
            (async () => {
                const data = await dispatch(getSingleProductRequest({slugName: params.slugName}));

                if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                    toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                }
            })()
        }
    }, [params.slugName]);

    return (
        <Wrapper
            statuses={{singleProductStatus}}
            pageName={`Product ${!_.isEmpty(singleProduct) ? singleProduct.title : ''}`}
        >
            {
                !_.isEmpty(singleProduct) ? (
                    <section className="single">
                        <h1 className="single__title">
                            {singleProduct.title}
                        </h1>
                        <div className="container">
                            <SingleProductCard
                                product={singleProduct}
                            />
                        </div>
                    </section>
                ) : null
            }
        </Wrapper>
    );
}

export default Single;
