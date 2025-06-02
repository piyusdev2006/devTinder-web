import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      if (!state) return state;
      const newArray = state.filter(
        (request) => request._id !== action.payload
      );
      return newArray;
    },
    clearRequests: (state, action) => {
      return null;
    },
  },
});


export const { addRequests, removeRequest, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;