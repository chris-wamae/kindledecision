import { configureStore } from "@reduxjs/toolkit";
import electionReducer from "../features/electionSlice";
import choiceReducer from "../features/choiceSlice"
import idReducer from "../features/idSlice"

export const store = configureStore({
    reducer:{
     election: electionReducer,
     choice: choiceReducer,
     id: idReducer
    }
})
