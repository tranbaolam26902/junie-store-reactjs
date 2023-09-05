// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import { authReducer } from '@redux/features/shared/auth';

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
