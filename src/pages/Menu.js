import React, {useCallback, useEffect, useRef, useState} from 'react';
import Wrapper from "../components/Wrapper";
import MenuAside from "../components/MenuAside";
import ProductCard from "../components/ProductCard";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import {getProductsListRequest} from "../store/actions/products";
import {useLocation, useNavigate} from "react-router-dom";
import PageNumbers from "../components/PageNumbers";
import qs from 'query-string';
import {getPaymentTypesRequest} from "../store/actions/paymentTypes";
import EmptyPage from "./EmptyPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faRightLong} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import {useOutsideClick} from "../helpers/useOutsideClick";

function Menu() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const productsList = useSelector(state => state.products.productsList);
    const productsStatus = useSelector(state => state.status.productsGetListStatus);
    const totalPages = useSelector(state => state.products.pages);
    const [currentPage, setCurrentPage] = useState(1);
    const [allowBuy, setAllowBuy] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [title, setTitle] = useState(qs.parse(location.search).title || '');
    const [myTimeout, setMyTimeout] = useState();
    const asideRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (!_.isEmpty(location)) {
            const page = qs.parse(location.search).page || 1;
            const category = qs.parse(location.search).category;
            const newTitle = qs.parse(location.search).title;

            (async () => {
                const data = await dispatch(getProductsListRequest({
                    title: newTitle,
                    category,
                    page
                }));

                if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                    toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                    return;
                }

                setTitle(newTitle || '');
                setCurrentPage(+page || 1);
            })()
        }
    }, [location.search]);

    useEffect(() => {
        (async () => {
            const dataPayment = await dispatch(getPaymentTypesRequest());

            if (!_.isEmpty(dataPayment.payload) && (dataPayment.payload?.status === 'error' || dataPayment.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(dataPayment.payload.message)));
                return;
            }

            const paymentTypes = dataPayment?.payload?.paymentTypes || [];
            const allowUse = paymentTypes.map(payment => payment.allowUse);

            setAllowBuy(!(_.isEmpty(paymentTypes) || !allowUse.includes('t')));
        })()

        function updateSize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleSearchChange = useCallback((val) => {
        let page = val ? 1 : qs.parse(location.search).page;
        let category = qs.parse(location.search).category;
        setTitle(val);
        page = +page || 1;
        const query = qs.stringify({page, category, title: val || null}, {skipNull: true});

        clearTimeout(myTimeout);

        setMyTimeout(setTimeout(() => {
            navigate(`/menu${query ? `?${query}` : ''}`);
        }, 400));
    }, [myTimeout, location.search]);

    const handleClickPage = useCallback((p) => {
        let query = qs.parse(location.search);
        query.page = p;
        query = qs.stringify(query, {skipNull: true});

        navigate(`${location.pathname}?${query}`);
    }, [location]);

    const handleClickCategory = useCallback((id) => {
        let query = qs.parse(location.search);
        query.category = id || null;
        query.page = 1;
        query = qs.stringify(query, {skipNull: true});

        navigate(`/menu?${query}`);
        setOpenSidebar(false);
    }, [location.search]);

    const handleOpenCloseSidebar = useCallback(() => {
        setOpenSidebar(prevState => !prevState);
    }, []);

    useOutsideClick(asideRef, () => {
        if (openSidebar) setOpenSidebar(false);
    });

    useEffect(() => {
        if (openSidebar) {
            document.body.classList.toggle("hidden");
        } else {
            document.body.classList.remove("hidden");
        }
    }, [openSidebar])


    return (
        <Wrapper
            statuses={{productsStatus}}
            pageName='Menu'
        >
            <section className="menu">
                <div
                    className={classNames(
                        'menu__bars__wrapper',
                        {open: openSidebar}
                    )}
                >
                    <div
                        ref={asideRef}
                        className={classNames(
                            'menu__bars__container',
                            {open: openSidebar}
                        )}
                    >
                        {
                            openSidebar || screenWidth > 768 ? (
                                <MenuAside handleClickCategory={handleClickCategory}/>
                            ) : null
                        }
                        <div
                            className="menu__bars"
                            onClick={handleOpenCloseSidebar}
                        >
                            <FontAwesomeIcon icon={faRightLong} className="menu__bars__icon"/>
                        </div>
                    </div>
                </div>
                <form className="menu__form">
                    <label htmlFor="search" className='menu__form__search'>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </label>
                    <input
                        autoComplete='off'
                        type='text'
                        className="menu__form__input"
                        id='search'
                        placeholder='Название продукта'
                        value={title}
                        onChange={(e) => {
                            handleSearchChange(e.target.value)
                        }}
                    />
                </form>
                <section className="products">
                    {
                        !_.isEmpty(productsList) ? (
                            productsList.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    allowBuy={allowBuy}
                                />
                            ))
                        ) : <EmptyPage/>
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
            </section>
        </Wrapper>
    );
}

export default Menu;
