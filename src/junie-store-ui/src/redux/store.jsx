// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import { sidebarReducer } from '@redux/features/admin/sidebar';
import { cartReducer } from '@redux/features/client/cart';
import { headerReducer } from '@redux/features/client/header';
import { orderReducer } from '@redux/features/client/order';
import { authReducer } from '@redux/features/shared/auth';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        cart: cartReducer,
        header: headerReducer,
        order: orderReducer,
        auth: authReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
