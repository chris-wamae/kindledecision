import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "../features/querySlice";
import choiceReducer from "../features/choiceSlice"
import idReducer from "../features/idSlice"
import userQueriesReducer from "../features/userQueriesSlice";

export const store = configureStore({
    reducer:{
     query: queryReducer,
     choice: choiceReducer,
     id: idReducer,
     userQuery:userQueriesReducer
    }
})
