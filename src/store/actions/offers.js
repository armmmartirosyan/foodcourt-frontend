import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getOffersListRequest = createAsyncThunk('offers/get/list', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.getOffers();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
