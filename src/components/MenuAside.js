import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategoriesListRequest} from "../store/actions/categories";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import AsideItem from "./AsideItem";
import qs from 'query-string';
import {useLocation} from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

function MenuAside(props) {
    const {handleClickCategory} = props;
    const dispatch = useDispatch();
    const location = useLocation();
    const categoriesList = useSelector(state => state.categories.categoriesList);

    useEffect(() => {
        (async () => {
            const data = await dispatch(getCategoriesListRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    const activeCategory = useMemo(() => {
        return  qs.parse(location.search).category;
    }, [location.search]);

    return (
        <ul className='filters'>
            {
                !_.isEmpty(categoriesList) ? (
                    <>
                        <li
                            className={classNames(
                                'filters__link btn__bg',
                                {active: !activeCategory}
                            )}
                            onClick={() => handleClickCategory(null)}
                        >
                            Все категории
                        </li>
                        {
                            categoriesList.map(category => (
                                <AsideItem
                                    key={category.id}
                                    category={category}
                                    handleClickCategory={handleClickCategory}
                                    activeCategory={activeCategory}
                                />
                            ))
                        }
                    </>
                ) : null
            }
        </ul>
    );
}

MenuAside.propTypes = {
    handleClickCategory: PropTypes.func.isRequired,
}

export default MenuAside;
