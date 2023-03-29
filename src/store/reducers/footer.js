import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    footer: {},
}

export default createReducer(initialState, (builder) => {
    builder
        .addMatcher((action) => action.type.endsWith('footer/get/fulfilled'), (state, action) => {
            state.footer = {...action.payload.footer};
        })
})
