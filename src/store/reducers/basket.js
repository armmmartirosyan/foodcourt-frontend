import {createReducer} from "@reduxjs/toolkit";
import {current} from "@reduxjs/toolkit";

const initialState = {
    basket: [],
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase('basket/get/list/fulfilled', (state, action) => {
            state.basket = action?.payload?.basket || [];
        })
        .addCase('basket/remove/fulfilled', (state, action) => {
            const newBasketList = current(state).basket.filter(item => +item.id !== +action?.payload?.removedItemId);

            state.basket = newBasketList;
        })
})
