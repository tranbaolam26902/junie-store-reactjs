// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import { cartReducer } from '@redux/features/client/cart';
import { headerReducer } from '@redux/features/client/header';
import { authReducer } from '@redux/features/shared/auth';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        header: headerReducer,
        auth: authReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
