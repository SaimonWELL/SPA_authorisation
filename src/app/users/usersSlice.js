import {createSlice} from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name:'username',
    initialState:{users:[]},
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload)
        },
        addUsers(state, action) {
            state.users = [...action.payload]
        },
        removeUser(state, action){
            state.users = state.users.filter(user => user.id !== action.payload)
        },
    },
})

export const { addUser, removeUser,addUsers } = usersSlice.actions;
export default usersSlice.reducer;