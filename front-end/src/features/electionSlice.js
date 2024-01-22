//Handles displaying of elections
//Handles creation of elections
//Handles updating elections
//Handles deletion of an election
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

export const electionSlice = createSlice({
    name: "election",
    initialState,
    reducers: {
        initialCreate: (state, action) => {
            state.title = action.payload.title;
            state.choices = action.payload.choices;
            state.voters = action.payload.voters;
            state.totalVotes = action.payload.totalVotes;
            state.creationDate = action.payload.creationDate;
        }
    }
})

export const {initialCreate} = electionSlice.actions;

export default electionSlice.reducer;