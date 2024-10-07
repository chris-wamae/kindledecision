import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "../features/querySlice";
import choiceReducer from "../features/choiceSlice"
<<<<<<< HEAD
import idReducer from "../features/idSlice"
import userQueriesReducer from "../features/userQueriesSlice";
=======
import userQueriesReducer from "../features/userQueriesSlice";
import selectionReducer from "../features/selectionSlice"
import loginReducer from "../features/loginSlice"
import signupReducer from "../features/signupSlice";
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

export const store = configureStore({
    reducer:{
     query: queryReducer,
     choice: choiceReducer,
<<<<<<< HEAD
     id: idReducer,
     userQuery:userQueriesReducer
    }
=======
     userQuery:userQueriesReducer,
     selection:selectionReducer,
     login:loginReducer,
     signup:signupReducer
        }
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
})
