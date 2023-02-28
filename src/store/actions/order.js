import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const setupIntent = createAsyncThunk('payment/setup/intent', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.setupIntent();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const addOrderRequest = createAsyncThunk('order/add', async (payload = {}, {rejectWithValue}) => {
    const {...props} = payload;
    let data;

    try {
        let newData = await Api.addOrder(props);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const getActualOrdersRequest = createAsyncThunk('order/get/actual', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.getActualOrders();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
