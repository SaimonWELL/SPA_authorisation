import { apiSlice } from "../api/apiSlice.js";

export const addUserApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        query:builder.mutation({
            query: credentials => ({
                url:'/api/v1/users/',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const {
    useQueryMutation
} = addUserApiSlice