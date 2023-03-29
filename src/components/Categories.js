import React, {useEffect} from 'react';
import CategoryCard from "./CategoryCard";
import {useDispatch, useSelector} from "react-redux";
import {getCategoriesListRequest} from "../store/actions/categories";
import _ from 'lodash';
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import AOS from "aos";
import "aos/dist/aos.css";

function Categories() {
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categories.categoriesList);

    useEffect(() => {
        AOS.init();

        (async () => {
            const data = await dispatch(getCategoriesListRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    return (
        <section
            className="categories"
            data-aos="fade-up"
            data-aos-duration="300"
        >
            <div className="container">
                <h3 className="categories__title">Категории</h3>
                <div className="row">
                    {
                        !_.isEmpty(categoriesList) ? (
                            categoriesList.map(category => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                />
                            ))
                        ) : null
                    }
                </div>
            </div>
        </section>
    );
}

export default Categories;
