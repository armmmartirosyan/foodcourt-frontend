import {createReducer} from "@reduxjs/toolkit";
import Account from "../../helpers/Account";

const initialState = {
    user: {},
    token: '',
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('user/login/fulfilled'), (state, action) => {
            const token = action?.payload?.token;
            const remember = action?.payload?.remember;

            Account.setToken(token, remember);

            state.token = token;
            state.user = action?.payload?.user;
        })
        .addMatcher((action) => action.type.endsWith('user/get/current/fulfilled'), (state, action) => {
            state.user = action?.payload?.user;
        })
        .addMatcher((action) => action.type.endsWith('user/modify/fulfilled'), (state, action) => {
            state.user = action?.payload?.updatedAccount;
        })
})
