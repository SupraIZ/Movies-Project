import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import authReducer from './features/auth/authSlice.js'
import { apiSlice } from './api/apiSlice';
import moviesReducer from './features/movies/moviesSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;