import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "../features/querySlice";
import choiceReducer from "../features/choiceSlice"
import idReducer from "../features/idSlice"
import userQueriesReducer from "../features/userQueriesSlice";
import selectionReducer from "../features/selectionSlice"
import loginReducer from "../features/loginSlice"

export const store = configureStore({
    reducer:{
     query: queryReducer,
     choice: choiceReducer,
     id: idReducer,
     userQuery:userQueriesReducer,
     selection:selectionReducer,
     login:loginReducer
        }
})
