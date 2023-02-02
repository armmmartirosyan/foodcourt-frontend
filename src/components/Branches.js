import React, {useEffect} from 'react';
import YandexMap from "./YandexMap";
import {useDispatch, useSelector} from "react-redux";
import {getBranchesListRequest} from "../store/actions/branches";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";

function Branches() {
    const dispatch = useDispatch();
    const branchesList = useSelector(state => state.branches.branchesList);

    useEffect(() => {
        (async () => {
           const data = await dispatch(getBranchesListRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    return (
        <section className="branches">
            <h3 className="branches__title">Our branches</h3>
            <YandexMap
                branchesList={branchesList}
                placemarkClick={true}
            />
        </section>
    );
}


export default Branches;
