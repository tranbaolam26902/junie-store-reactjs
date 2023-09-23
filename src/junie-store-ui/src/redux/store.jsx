// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import { headerReducer } from '@redux/features/client/header';
import { authReducer } from '@redux/features/shared/auth';

export const store = configureStore({
    reducer: {
        header: headerReducer,
        auth: authReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
