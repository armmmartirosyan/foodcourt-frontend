import React, {useEffect} from 'react';
import Wrapper from "../components/Wrapper";
import {toast} from "react-toastify";
import _ from "lodash";
import Helper from "../helpers/Helper";
import {useDispatch, useSelector} from "react-redux";
import {getSingleBranchRequest} from "../store/actions/branches";
import {useParams} from "react-router-dom";
import YandexMap from "../components/YandexMap";
import BranchImage from "../components/BranchImage";

const {REACT_APP_API_URL} = process.env;

function SingleBranch() {
    const dispatch = useDispatch();
    const params = useParams();
    const branch = useSelector(state => state.branches.singleBranch);
    const singleBranchStatus = useSelector(state => state.status.branchesGetSingleStatus);

    useEffect(() => {
        if (params.id) {
            (async () => {
                const data = await dispatch(getSingleBranchRequest({id: params.id}));

                if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                    toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                }
            })()
        }
    }, [params]);

    return (
        <Wrapper
            statuses={{singleBranchStatus}}
            pageName={`Branch ${!_.isEmpty(branch) ? branch.title : ''}`}
        >
            {
                !_.isEmpty(branch) ? (
                    <section className="branch">
                        <div className="container">
                            <div className="branch__body">
                                <div className="branch__map__box">
                                    <YandexMap
                                        branchesList={[branch]}
                                        placemarkClick={false}
                                    />
                                </div>
                                <div className="branch__information">
                                    <figure className="branch__first__fig">
                                        <img
                                            src={`${REACT_APP_API_URL}/${branch.images[0].name}`}
                                            alt="image"
                                            className="branch__first__img"
                                        />
                                    </figure>
                                    <div className="branch__information__box">
                                        <h1 className="branch__title">{branch.title}</h1>
                                        <p className="branch__info">{`Address\` ${branch.location}`}</p>
                                        <p className="branch__info">{`Phone\` +${branch.phoneNum}`}</p>
                                        {
                                            branch.main === 'main' ? (
                                                <p className="branch__info">
                                                    Main branch
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="branch__img__box">
                                {
                                    branch.images.map(image => (
                                        <BranchImage
                                            image={image}
                                            key={image.id}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                ) : null
            }
        </Wrapper>
    );
}

export default SingleBranch;
