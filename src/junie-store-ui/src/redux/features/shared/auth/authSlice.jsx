// Libraries
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: ''
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    }
});

export const authReducer = authSlice.reducer;
export const selectAuth = (state) => state.auth;
export const { setAccessToken } = authSlice.actions;
