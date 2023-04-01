import React, {useEffect} from 'react';
import YandexMap from "./YandexMap";
import {useDispatch, useSelector} from "react-redux";
import {getBranchesListRequest} from "../store/actions/branches";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import BranchesContact from "./BranchesContact";
import AOS from "aos";
import "aos/dist/aos.css";

function Branches() {
    const dispatch = useDispatch();
    const branchesList = useSelector(state => state.branches.branchesList);

    useEffect(() => {
        AOS.init();

        (async () => {
           const data = await dispatch(getBranchesListRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    return (
        <>
            {
                !_.isEmpty(branchesList) ? (
                    <section
                        className="branches"
                        data-aos="fade-up"
                        data-aos-duration="300"
                    >
                        <div className='branches__map__container'>
                            <YandexMap branchesList={branchesList}/>
                        </div>
                        <BranchesContact branches={branchesList}/>
                    </section>
                ) : null
            }
        </>
    );
}


export default Branches;
