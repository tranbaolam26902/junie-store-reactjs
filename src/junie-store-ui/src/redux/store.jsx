// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import { productsReducer } from '@redux/features/client/products';
import { authReducer } from '@redux/features/shared/auth';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
