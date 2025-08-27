// data/ReduxStore.tsx
import { configureStore } from '@reduxjs/toolkit';
import ProductReducers from '../reducers/ProductReducers';
import UserReducer from '../reducers/user/User';

export const store = configureStore({
    reducer: {
        products: ProductReducers,
        user: UserReducer,
    },
});

// to solve typeScript 'unkonwn'error
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;