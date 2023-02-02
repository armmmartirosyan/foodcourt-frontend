import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import MenuAside from "../components/MenuAside";
import ProductCard from "../components/ProductCard";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import {getProductsListRequest} from "../store/actions/products";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import PageNumbers from "../components/PageNumbers";
import qs from 'query-string';

function Menu() {
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const productsList = useSelector(state => state.products.productsList);
    const productsStatus = useSelector(state => state.status.productsGetListStatus);
    const totalPages = useSelector(state => state.products.pages);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!_.isEmpty(location)) {
            const page = qs.parse(location.search).page || 1;

            (async () => {
                const data = await dispatch(getProductsListRequest({
                    categorySlug: params.slugName,
                    page
                }));

                if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                    toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                    return;
                }

                setCurrentPage(+page || 1);
            })()
        }
    }, [location]);

    const handleClickPage = useCallback((p) => {
        let query = qs.parse(location.search);
        query.page = p;
        query = qs.stringify(query, {skipNull: true});

        navigate(`${location.pathname}?${query}`);
    }, [location]);

    return (
        <Wrapper
            statuses={{productsStatus}}
            pageName='Menu'
        >
            <section className="menu">
                {
                    params.slugName ? (
                        <h1 className="menu__title">
                            {_.startCase(params.slugName)}
                        </h1>
                    ) : null
                }
                <div className="container">
                    <MenuAside/>
                    <section className="products">
                        {
                            productsList.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }
                    </section>
                    {
                        totalPages > 1 ? (
                            <PageNumbers
                                handleClickPage={handleClickPage}
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                        ) : null
                    }
                </div>
            </section>
        </Wrapper>
    );
}

export default Menu;
