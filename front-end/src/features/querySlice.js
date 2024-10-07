import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
<<<<<<< HEAD

export const postQuery = createAsyncThunk("query/postQuery",async (post) => {

const response = await axios.post(`${process.env.REACT_APP_BASE_URL}queries`, post )
=======
import Cookies from "js-cookie";
import { timeAfterMinutes } from "../Helper/Time";
import { useSelector } from "react-redux";
import { loginState } from "./loginSlice";

export const postQuery = createAsyncThunk("query/postQuery",async (post) => {

const response = await axios.post(`${process.env.REACT_APP_BASE_URL}query`, post, {headers: {Authorization: `Bearer ${Cookies.get("at")}`}})

//Cookies.set("NQID", response.data.id, {expires:timeAfterMinutes(15)})

return response.data

})

export const getQuery = createAsyncThunk("query/getQuery", async(queryId) => {

console.log("fetching query")

const response = await axios.get(`${process.env.REACT_APP_BASE_URL}query/${queryId}`,{headers:{Authorization:`Bearer ${Cookies.get("at")}`}})
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

return response.data

})





const initialState = {

    query:{

<<<<<<< HEAD
        title: "",
=======
        title:"",
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

        creationTime: null,

        startDate:null,
  
        expiryDate:null,
  
        totalSelections:null,
  
        remainingSelections:null,

        creatorUserId:null
    },
<<<<<<< HEAD
=======
    queries:[],
    queryChange:false,
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    status: "idle",
    error: null
}

export const querySlice = createSlice({
    name: "query",
    initialState,
    reducers: {
<<<<<<< HEAD
        initialCreate:
         (state, action) => {
            state.query = action.payload
=======
        setQueryState:
         (state, action) => {
            state.query = action.payload
        },
        setQueryChange:
        (state,action) => {
            state.queryChange = action.payload
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
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
<<<<<<< HEAD
=======
    .addCase(getQuery.pending, (state,action) => {
        state.status = "loading"
    })
    .addCase(getQuery.fulfilled, (state,action) => {
       state.status = "succeeded"
       state.query = action.payload
    })
    .addCase(getQuery.rejected, (state,action) => {
        state.status = "failed"
        state.error = action.error.message
    })
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

    // .addCase(getAllElections.pending, (state,action) => {
    //    state.status = "loading"
    //    state.
    // })
         
    }
})

export const queryState = state => state.query.query

<<<<<<< HEAD
=======
export const queryStatus = state => state.query.status

export const queryChangeStatus = state => state.query.queryChange

export const {setQueryState} = querySlice.actions

export const {setQueryChange} = querySlice.actions;
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

export default querySlice.reducer;