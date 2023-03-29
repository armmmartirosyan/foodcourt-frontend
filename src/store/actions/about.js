import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getAboutRequest = createAsyncThunk('about/get', async (payload = {}, {rejectWithValue}) => {
    let data;

    try{
        let newData = await Api.getAbout();
        data = newData.data;
    }catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
