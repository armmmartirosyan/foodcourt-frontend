import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getProductsListRequest = createAsyncThunk('products/get/list', async (payload = {}, {rejectWithValue}) => {
    const {...params} = payload;

    let data;

    try {
        let newData = await Api.getProductsList(params);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const getSingleProductRequest = createAsyncThunk('products/get/single', async (payload = {}, {rejectWithValue}) => {
    const {slugName} = payload;
    let data;

    try {
        let newData = await Api.getSingleProduct(slugName);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
