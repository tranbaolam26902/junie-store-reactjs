// Libraries
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    statusFilter: 'None'
};
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setStatusFilter: (state, action) => {
            state.statusFilter = action.payload;
        }
    }
});

export const orderReducer = orderSlice.reducer;
export const selectOrder = (state) => state.order;
export const { setStatusFilter } = orderSlice.actions;
