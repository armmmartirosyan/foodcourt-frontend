import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    offersList: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('offers/get/list/fulfilled'), (state, action) => {
            state.offersList = action?.payload?.offers || [];
        })
})
