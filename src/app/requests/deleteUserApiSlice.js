import { apiSlice } from "../api/apiSlice.js";

export const deleteUserApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        delete:builder.mutation({
            query: id => ({
                url:`/api/v1/users/${id}/`,
                method: 'DELETE',
            })
        })
    })
})

export const {
    useDeleteMutation
} = deleteUserApiSlice