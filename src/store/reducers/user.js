import {createReducer} from "@reduxjs/toolkit";
import Account from "../../helpers/Account";

const initialState = {
    user: {},
    token: '',
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('user/login/fulfilled'), (state, action) => {
            const {token, remember, user} = action?.payload;

            Account.setToken(token, remember);

            state.token = token;
            state.user = user;
        })
        .addMatcher((action) => action.type.endsWith('user/get/current/fulfilled'), (state, action) => {
            state.user = action?.payload?.user;
        })
        .addMatcher((action) => action.type.endsWith('user/get/current/rejected'), (state, action) => {
            if(action?.payload?.status === 401){
                Account.deleteToken();
                window.location.href = "/";
            }
        })
        .addMatcher((action) => action.type.endsWith('user/modify/fulfilled'), (state, action) => {
            state.user = action?.payload?.updatedAccount;
        })
})
