import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {setCredentials, logOut} from "../../features/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
    baseUrl:'https://test-assignment.emphasoft.com',
    // credentials:'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token){
            headers.set("Authorization",`Token ${token}`)
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({})
})