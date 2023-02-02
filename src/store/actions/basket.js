import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getBasketRequest = createAsyncThunk('basket/get/list', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.getBasket();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const addBasketRequest = createAsyncThunk('basket/add', async (payload = {}, {rejectWithValue}) => {
    const {...params} = payload;
    let data;

    try {
        let newData = await Api.addBasket(params);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const removeFromBasketRequest = createAsyncThunk('basket/remove', async (payload = {}, {rejectWithValue}) => {
    const {id} = payload;
    let data;

    try {
        let newData = await Api.removeFromBasket(id);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
