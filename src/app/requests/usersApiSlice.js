import { apiSlice } from "../api/apiSlice.js"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () =>'/api/v1/users/',
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice