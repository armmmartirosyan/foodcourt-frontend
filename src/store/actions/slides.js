import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getSlidesListRequest = createAsyncThunk('slides/get/list', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.getSlidesList();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
