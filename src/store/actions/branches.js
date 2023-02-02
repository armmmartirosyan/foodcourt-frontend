import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const getBranchesListRequest = createAsyncThunk('branches/get/list', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.getBranchesList();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const getSingleBranchRequest = createAsyncThunk('branches/get/single', async (payload = {}, {rejectWithValue}) => {
    const {id} = payload;
    let data;

    try {
        let newData = await Api.getSingleBranch(id);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
