import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    branchesList: [],
    singleBranch: {},
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('branches/get/list/fulfilled'), (state, action) => {
            state.branchesList = action?.payload?.branches || [];
        })
        .addMatcher((action) => action.type.endsWith('branches/get/single/fulfilled'), (state, action) => {
            state.singleBranch = action?.payload?.singleBranch || {};
        })
})
