import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    paymentTypes: [],
    allowBuy: false,
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('payment/types/get/all/fulfilled'), (state, action) => {
            const payments = action?.payload?.paymentTypes || [];
            const allowUse = payments.map(payment => payment.allowUse);

            state.paymentTypes = [...payments];
            state.allowBuy = allowUse.includes('t');
        })
})
