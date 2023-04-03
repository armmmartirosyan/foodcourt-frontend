import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    productsList: [],
    productsListByCat: [],
    singleProduct: {},
    pages: 1,
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('products/get/list/fulfilled'), (state, action) => {
            const data = action?.payload?.data || {};

            state.productsList = data.products || [];
            state.pages = data.totalPages || 1;
        })
        .addMatcher((action) => action.type.endsWith('products/get/by/cat/fulfilled'), (state, action) => {
            state.productsListByCat = action?.payload?.products || [];
        })
        .addMatcher((action) => action.type.endsWith('products/get/single/fulfilled'), (state, action) => {
            state.singleProduct = action?.payload?.product;
        })
})
