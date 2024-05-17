import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const postChoice = createAsyncThunk("choice/postChoice", async ({id,post}) =>
{
const response = await axios.post(`${process.env.REACT_APP_BASE_URL}query/choice/${id}`, post)

return response.data

})


export const getChoices = createAsyncThunk("choice/getChoices", async (queryId)=> {

const response = await axios.get(`${process.env.REACT_APP_BASE_URL}query/choice/get-query-choices/${queryId}`, {headers:{Authorization:`Bearer ${Cookies.get("at")}`}})

return response.data
})

const initialState = {
  choice:{
    title:"",
    queryId:null
  },
  choices:[],
  status:"idle",
  error:null,
}

export const choiceSlice = createSlice(
    {
     name:"choice",
     initialState,
     reducers:{
      setChoicesState: (state,action) => {
        state.choices = action.payload
      }
     },
     extraReducers(builder){
    builder
            .addCase(postChoice.pending, (state, action) =>{
                state.status = "loading"
            })
            .addCase(postChoice.fulfilled, (state,action) =>{
                state.status = "succeeded"
            })
            .addCase(postChoice.rejected, (state,action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(getChoices.fulfilled, (state,action) => {
              state.status = "succeeded"
              state.choices = action.payload
            })
            .addCase(getChoices.pending, (state,action) => {
              state.status = "loading"
            })
            .addCase(getChoices.rejected, (state,action) => {
              state.status = "failed"
              state.error = action.error.message
            })
     }
    }
)

export const choiceState = state => state.choice.choice

export const choicesState = state => state.choice.choices

export const {setChoicesState} = choiceSlice.actions;

export default choiceSlice.reducer;

