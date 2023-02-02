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
