// Libraries
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {},
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
