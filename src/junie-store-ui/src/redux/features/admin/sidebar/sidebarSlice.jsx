// Libraries
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTab: 'dashboard'
};
const sidebarSlide = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        }
    }
});

export const sidebarReducer = sidebarSlide.reducer;
export const selectSidebar = (state) => state.sidebar;
export const { setCurrentTab } = sidebarSlide.actions;
