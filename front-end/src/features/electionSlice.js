import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postElection = createAsyncThunk("election/postElection",async (post) => {

const response = await axios.post(`${process.env.REACT_APP_BASE_URL}elections`,post )

return response.data

})

const initialState = {

    election: {

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
    },
    status: "idle",
    error: null

}

export const electionSlice = createSlice({
    name: "election",
    initialState,
    reducers: {
        initialCreate:
         (state, action) => {
            state.election = action.payload
        }
    },
    extraReducers(builder){
    builder
    
    .addCase(postElection.pending, (state, action) => {
        state.status = "loading"
    })

    .addCase(postElection.fulfilled, (state,action) =>{
        state.status = "succeeded"
        state.election = action.payload
    })

    .addCase(postElection.rejected, (state,action) =>{
        state.status = "failed"
        state.error = action.error.message
    })
         
    }
})

export const electionState = state => state.election.election

export const {initialCreate} = electionSlice.actions;

export default electionSlice.reducer;