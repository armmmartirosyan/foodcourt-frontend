import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getCommentsRequest = createAsyncThunk('comment/get/all', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.getComments();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const addCommentRequest = createAsyncThunk('comment/add', async (payload = {}, {rejectWithValue}) => {
    const {...params} = payload;
    let data;

    try {
        let newData = await Api.addComment(params);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
