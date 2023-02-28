import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import qs from "query-string";
import {useDispatch, useSelector} from "react-redux";
import {activateUserRequest} from "../store/actions/user";
import _ from "lodash";
import {toast} from "react-toastify";
import Helper from "../helpers/Helper";
import Wrapper from "../components/Wrapper";

function ConfirmUser() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [allowLogin, setAllowLogin] = useState(false);
    const activateStatus = useSelector(state => state.status.userActivateStatus);

    useEffect(() => {
        if (location) {
            const email = qs.parse(location.search).email;
            const token = qs.parse(location.search).token;

            (async () => {
                const data = await dispatch(activateUserRequest({email, token}));

                if (!_.isEmpty(data.payload) && (data.payload?.status === 'error' || data.payload?.status !== 'ok')) {
                    toast.error(_.capitalize(Helper.clearAxiosError(data.payload.message)));
                    return;
                }

                setAllowLogin(true);
            })()
        }
    }, [location]);

    return (
        <Wrapper pageName='Activate user' statuses={{activateStatus}}>
            {
                allowLogin ? (
                    <Link to='/login'>Login</Link>
                ) : (
                    <div>Activation user</div>
                )
            }
        </Wrapper>
    );
}

export default ConfirmUser;
