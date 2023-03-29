import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    comments: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('comment/get/all/fulfilled'), (state, action) => {
            state.comments = action?.payload?.comments || [];
        })
})
