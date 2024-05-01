import { configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice.js"
import authReducer from '../features/auth/authSlice.js'
import usersReducer from '../app/users/usersSlice.js'
import userIdReducer from '../app/users/userIdSlice.js'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
        users:usersReducer,
        id:userIdReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})