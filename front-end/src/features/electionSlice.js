import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postElection = createAsyncThunk("election/postElection",async (post) => {

const response = await axios.post(`${process.env.REACT_APP_BASE_URL}elections`,post )

return response.data

})

export const getAllElections = createAsyncThunk("election/getAllElections", async (post) => {
 const response = await axios.get(`${process.env.REACT_APP_BASE_URL}elections`)

 return response.data
})

const initialState = {

    elections:[{

        title: "",
        //each choice has a title and unique id 
        choices: [],
        //each voter has an email and unique id
        voters: [],
        //votes holds objects with voterId and choiceId
        votes: [],
    
        votesCast: 0,
    
        totalVotes: 0,
    
        creationDate: null,
    }],
    status: "idle",
    error: null,
}

export const electionSlice = createSlice({
    name: "election",
    initialState,
    reducers: {
        initialCreate:
         (state, action) => {
            state.elections = [action.payload]
        }
    },
    extraReducers(builder){
    builder
    
    .addCase(postElection.pending, (state, action) => {
        state.status = "loading"
    })

    .addCase(postElection.fulfilled, (state,action) =>{
        state.status = "succeeded"
        state.elections = [action.payload]
    })

    .addCase(postElection.rejected, (state,action) =>{
        state.status = "failed"
        state.error = action.error.message
    })

    // .addCase(getAllElections.pending, (state,action) => {
    //    state.status = "loading"
    //    state.
    // })
         
    }
})

export const electionState = state => state.election.elections

export const {initialCreate} = electionSlice.actions;

export default electionSlice.reducer;