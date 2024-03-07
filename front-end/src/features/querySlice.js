import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";

export const postQuery = createAsyncThunk("query/postQuery",async (post) => {

const response = await axios.post(`${process.env.REACT_APP_BASE_URL}queries`, post )

Cookies.set("NQID", response.data.id, {expires:timeAfterMinutes(15)})

return response.data

})





const initialState = {

    query:{

        title: "",

        creationTime: null,

        startDate:null,
  
        expiryDate:null,
  
        totalSelections:null,
  
        remainingSelections:null,

        creatorUserId:null
    },
    queries:[],
    status: "idle",
    error: null
}

export const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
        setQueryState:
         (state, action) => {
            state.query = action.payload
        }
    },
    extraReducers(builder){
    builder
    
    .addCase(postQuery.pending, (state, action) => {
        state.status = "loading"
    })

    .addCase(postQuery.fulfilled, (state,action) =>{
        state.status = "succeeded"
        state.query = action.payload
    })

    .addCase(postQuery.rejected, (state,action) =>{
        state.status = "failed"
        state.error = action.error.message
    })

    // .addCase(getAllElections.pending, (state,action) => {
    //    state.status = "loading"
    //    state.
    // })
         
    }
})

export const queryState = state => state.query.query

export const {setQueryState} = querySlice.actions

export default querySlice.reducer;