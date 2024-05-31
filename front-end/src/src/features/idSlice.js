import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
 selectionId:null,

 choiceId:null,

 queryId:null,

 userId:null,

 currentUserId:null

}

export const idSlice = createSlice({
name:"id",
initialState,
reducers:{
 changeSelectionId:
 (state, action) => {
    state.selectionId = action.payload
 },
 changeChoiceId: 
 (state, action) => {
    state.choiceId = action.payload
 },
 changeQueryId:
 (state, action) => {
    state.queryId = action.payload
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

export const currentSelectionId = state => state.id.selectionId

export const currentChoiceId = state => state.id.choiceId

export const currentQueryId = state => state.id.queryId

export const  currentUserId = state => state.id.userId

export const { changeSelectionId ,changeChoiceId, changeQueryId, changeUserId} = idSlice.actions;

export default idSlice.reducer;