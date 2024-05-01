import {createSlice} from "@reduxjs/toolkit";


const userIdSlice = createSlice({
    name:'id',
    initialState:{userId:0},
    reducers: {
        addId(state, action) {
            state.userId=action.payload
        },

    },
})

export const { addId } = userIdSlice.actions;
export default userIdSlice.reducer;