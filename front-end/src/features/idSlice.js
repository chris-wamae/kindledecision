import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
 voteId:null,

 choiceId:null,

 electionId:null,

 userId:null,

 currentUserId:null

}

export const idSlice = createSlice({
name:"id",
initialState,
reducers:{
 changeVoteId:
 (state, action) => {
    state.voteId = action.payload
 },
 changeChoiceId: 
 (state, action) => {
    state.choiceId = action.payload
 },
 changeElectionId:
 (state, action) => {
    state.electionId = action.payload
 },
 changeUserId:
 (state,action) => {
    state.userId = action.payload
 },
 currentUserId:
 (state,action) => {
    state.currentUserId = action.payload
 }
}

})

export const currentVoteId = state => state.id.voteId

export const currentStateId = state => state.id.choiceId

export const currentElectionId = state => state.id.electionId

export const  currentUserId = state => state.id.userId

export const { changeVoteId ,changeChoiceId, changeElectionId, changeUserId} = idSlice.actions;

export default idSlice.reducer;