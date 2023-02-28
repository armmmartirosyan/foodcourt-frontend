import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    orders: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('order/get/actual/fulfilled'), (state, action) => {
            state.orders = action?.payload?.notReceivedOrders;
        })
})
