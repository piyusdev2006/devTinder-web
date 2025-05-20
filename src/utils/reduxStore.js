
// creating redux store by calling a function or method {configureStore } which comes from redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const reduxStore = configureStore({
    reducer: {
        user: userReducer,
    },
})
 

export  default reduxStore;