
// creating redux store by calling a function or method {configureStore } which comes from redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice"
import requestSlice from "./requestSlice"


const reduxStore = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
        connections: connectionSlice,
        requests: requestSlice,
    },
})
 

export  default reduxStore;