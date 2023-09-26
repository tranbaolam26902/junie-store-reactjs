// Libraries
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showMobileNavbar: false,
    showSearchSidebar: false,
    showCartSidebar: false
};
const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setShowMobileNavbar: (state) => {
            state.showMobileNavbar = true;
        },
        setHideMobileNavbar: (state) => {
            state.showMobileNavbar = false;
        },
        setShowSearchSidebar: (state) => {
            state.showSearchSidebar = true;
        },
        setHideSearchSidebar: (state) => {
            state.showSearchSidebar = false;
        },
        setShowCartSidebar: (state) => {
            state.showCartSidebar = true;
        },
        setHideCartSidebar: (state) => {
            state.showCartSidebar = false;
        }
    }
});

export const headerReducer = headerSlice.reducer;
export const selectHeader = (state) => state.header;
export const {
    setShowMobileNavbar,
    setHideMobileNavbar,
    setShowSearchSidebar,
    setHideSearchSidebar,
    setShowCartSidebar,
    setHideCartSidebar
} = headerSlice.actions;
