import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Api";

export const loginRequest = createAsyncThunk('user/login', async (payload = {}, {rejectWithValue}) => {
    const {remember, ...params} = payload;
    let data;

    try {
        let newData = await Api.login(params);
        data = {...newData.data, remember};
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const registerRequest = createAsyncThunk('user/register', async (payload = {}, {rejectWithValue}) => {
    const {...params} = payload;
    let data;

    try {
        let newData = await Api.register(params);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const getCurrentAccountRequest = createAsyncThunk('user/get/current', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.getCurrentProfile();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const modifyProfileRequest = createAsyncThunk('user/modify', async (payload = {}, {rejectWithValue}) => {
    const {...params} = payload;
    let data;

    try {
        let newData = await Api.modifyProfile(params);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const deleteProfileRequest = createAsyncThunk('user/delete', async (payload = {}, {rejectWithValue}) => {
    let data;

    try {
        let newData = await Api.deleteProfile();
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const getKeyRequest = createAsyncThunk('user/get/key', async (payload = {}, {rejectWithValue}) => {
    const {email} = payload;
    let data;

    try {
        let newData = await Api.getKey(email);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const changePasswordRequest = createAsyncThunk('user/change/password', async (payload = {}, {rejectWithValue}) => {
    const {...params} = payload;
    let data;

    try {
        let newData = await Api.changePassword(params);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});

export const activateUserRequest = createAsyncThunk('user/activate', async (payload = {}, {rejectWithValue}) => {
    const {token, email} = payload;
    let data;

    try {
        let newData = await Api.activateAccount(email, token);
        data = newData.data;
    } catch (e) {
        return rejectWithValue(e.response.data);
    }

    return data;
});
