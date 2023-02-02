import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    basket: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('basket/get/list/fulfilled'), (state, action) => {
            state.basket = action?.payload?.basket || [];
        })
})
