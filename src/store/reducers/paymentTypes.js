import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    paymentTypes: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('payment/types/get/all/fulfilled'), (state, action) => {
            state.paymentTypes = [...action.payload.paymentTypes];
        })
})
