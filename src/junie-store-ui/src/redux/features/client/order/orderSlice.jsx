// Libraries
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    statusFilter: 'None',
    updateOrders: false
};
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setStatusFilter: (state, action) => {
            state.statusFilter = action.payload;
        },
        triggerUpdateOrders: (state) => {
            state.updateOrders = !state.updateOrders;
        }
    }
});

export const orderReducer = orderSlice.reducer;
export const selectOrder = (state) => state.order;
export const { setStatusFilter, triggerUpdateOrders } = orderSlice.actions;
