import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import {getOffersListRequest} from "../store/actions/offers";
import OfferCard from "./OfferCard";

function Offers() {
    const dispatch = useDispatch();
    const offersList = useSelector(state => state.offers.offersList);
    const [more, setMore] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await dispatch(getOffersListRequest());

            if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
            }
        })()
    }, []);

    return (
        <section className="offers">
            <div className="container">
                <h3 className="offers__title">Our offers</h3>
                <div className="row">
                    {
                        !_.isEmpty(offersList) && more ? (
                            offersList.map(offer => (
                                <OfferCard
                                    key={offer.id}
                                    offer={offer}
                                />
                            ))
                        ) : null
                    }
                    {
                        !_.isEmpty(offersList) && !more ? (
                            [...new Array(3)].map((v, index) => {
                                if (!_.isEmpty(offersList[index])) {
                                    return (
                                        <OfferCard
                                            key={offersList[index].id}
                                            offer={offersList[index]}
                                        />
                                    )
                                }
                            })
                        ) : null
                    }
                </div>
                {
                    offersList.length >= 3 ? (
                        <button
                            className="offers__btn btn__bg"
                            onClick={() => {
                                setMore(!more)
                            }}
                        >
                            {more ? 'Show less' : 'Show more'}
                        </button>
                    ) : null
                }
            </div>
        </section>
    );
}

export default Offers;
