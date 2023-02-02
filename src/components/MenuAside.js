import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategoriesListRequest} from "../store/actions/categories";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import AsideItem from "./AsideItem";

function MenuAside() {
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categories.categoriesList);

    useEffect(() => {
        (async () => {
            const data = await dispatch(getCategoriesListRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    return (
        <aside className="aside">
            <ul className='aside__list'>
                {
                    !_.isEmpty(categoriesList) ? (
                        categoriesList.map(category => (
                            <AsideItem
                                key={category.id}
                                category={category}
                            />
                        ))
                    ) : null
                }
            </ul>
        </aside>
    );
}

export default MenuAside;
