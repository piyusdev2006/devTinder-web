
// creating redux store by calling a function or method {configureStore } which comes from redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer  from "./feedSlice";


const reduxStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    },
})
 

export  default reduxStore;