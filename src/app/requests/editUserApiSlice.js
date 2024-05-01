import {apiSlice} from "../api/apiSlice.js";

export const editUserApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        edit:builder.mutation({
            query: ({id, credentials}) => ({
                url:`/api/v1/users/${id}/`,
                method: 'PATCH',
                body: {...credentials}
            })
        })
    })
})

export const {
    useEditMutation
} = editUserApiSlice