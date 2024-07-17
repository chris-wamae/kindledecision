import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "../features/querySlice";
import choiceReducer from "../features/choiceSlice"
import userQueriesReducer from "../features/userQueriesSlice";
import selectionReducer from "../features/selectionSlice"
import loginReducer from "../features/loginSlice"
import signupReducer from "../features/signupSlice";

export const store = configureStore({
    reducer:{
     query: queryReducer,
     choice: choiceReducer,
     userQuery:userQueriesReducer,
     selection:selectionReducer,
     login:loginReducer,
     signup:signupReducer
        }
})
