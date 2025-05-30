import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const newArray = state.filter((uniqueRequestId) => uniqueRequestId._id !== action.payload);
            return newArray;
        }
    }
})


export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;