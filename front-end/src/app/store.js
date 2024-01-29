import { configureStore } from "@reduxjs/toolkit";
import electionReducer from "../features/electionSlice";

export const store = configureStore({
    reducer:{
     election: electionReducer
    }
})
