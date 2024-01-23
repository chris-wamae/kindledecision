//Handles displaying of elections
//Handles creation of elections
//Handles updating elections
//Handles deletion of an election
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    election:

    {
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
    }

}

export const electionSlice = createSlice({
    name: "election",
    initialState,
    reducers: {
        initialCreate:
         (state, action) => {
            state.election = action.payload
        }
    }
})

export const electionState = state => state.election.election

export const {initialCreate} = electionSlice.actions;

export default electionSlice.reducer;