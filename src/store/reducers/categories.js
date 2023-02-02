import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    categoriesList: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('categories/get/list/fulfilled'), (state, action) => {
            state.categoriesList = action?.payload?.categories || [];
        })
})
