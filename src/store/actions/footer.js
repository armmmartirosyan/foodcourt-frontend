import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getFooterRequest = createAsyncThunk('footer/get', async (payload = {}, {rejectWithValue}) => {
    let data;

    try{
        let newData = await Api.getFooter();
        data = newData.data;
    }catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
