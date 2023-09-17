// Libraries
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    queries: {
        Keyword: '',
        CategorySlug: '',
        PageNumber: 1,
        PageSize: 20,
        SortColumn: 'createDate',
        SortOrder: 'desc'
    },
    items: [],
    metadata: {}
};
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductKeyword: (state, action) => {
            state.queries.Keyword = action.payload;
        },
        setCategorySlug: (state, action) => {
            state.queries.CategorySlug = action.payload;
        },
        setProductPageNumber: (state, action) => {
            state.queries.PageNumber = action.payload;
        },
        increaseProductPageNumber: (state) => {
            if (state.metadata.hasNextPage) state.queries.PageNumber = ++state.queries.PageNumber;
        },
        decreaseProductPageNumber: (state) => {
            if (state.metadata.hasPreviousPage) state.queries.PageNumber = --state.queries.PageNumber;
        },
        setProductPageSize: (state, action) => {
            state.queries.PageSize = action.payload;
        },
        setProductSortColumn: (state, action) => {
            state.queries.SortColumn = action.payload;
        },
        setProductSortOrder: (state, action) => {
            state.queries.SortOrder = action.payload;
        },
        resetProductQueries: (state) => {
            state.queries = {
                Keyword: '',
                CategorySlug: '',
                PageNumber: 1,
                PageSize: 20,
                SortColumn: 'createdDate',
                SortOrder: 'DESC'
            };
        },
        setProductItems: (state, action) => {
            state.items = action.payload;
        },
        setProductsMetadata: (state, action) => {
            state.metadata = action.payload;
        }
    }
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state) => state.products;
export const {
    setProductKeyword,
    setCategorySlug,
    setProductPageNumber,
    increaseProductPageNumber,
    decreaseProductPageNumber,
    setProductPageSize,
    setProductSortColumn,
    setProductSortOrder,
    resetProductQueries,
    setProductItems,
    setProductsMetadata
} = productsSlice.actions;
