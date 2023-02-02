import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    slidesList: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('slides/get/list/fulfilled'), (state, action) => {
            state.slidesList = action?.payload?.slides || [];
        })
})
