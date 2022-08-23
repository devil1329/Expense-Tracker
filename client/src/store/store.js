import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import { expenseSlice } from './reducer';


export const store = configureStore({
    reducer : {
        expesnse : expenseSlice,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware) 
})