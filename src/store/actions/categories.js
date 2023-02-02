import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getCategoriesListRequest = createAsyncThunk('categories/get/list', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.getCategoriesList();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
