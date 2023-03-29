import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getPaymentTypesRequest = createAsyncThunk('payment/types/get/all', async (payload = {}, {rejectWithValue}) => {
    let data;

    try{
        let newData = await Api.getPaymentTypes();
        data = newData.data;
    }catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
