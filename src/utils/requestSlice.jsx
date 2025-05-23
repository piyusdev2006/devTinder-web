import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequests: (state, action) => null
    }
})


export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;