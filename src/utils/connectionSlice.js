import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      if (!state || !Array.isArray(state)) return state;
      return state.filter((connection) => connection._id !== action.payload);
    },
    clearConnections: (state, action) => {
      return null;
    },
  },
});

export const { addConnections, removeConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;