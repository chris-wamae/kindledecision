import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
<<<<<<< HEAD

export const postChoice = createAsyncThunk("choice/postChoice", async (post) =>
{

const response = await axios.post(`${process.env.REACT_APP_BASE_URL}Choices`, post)
=======
import Cookies from "js-cookie";

export const postChoice = createAsyncThunk("choice/postChoice", async ({id,post}) =>
{
const response = await axios.post(`${process.env.REACT_APP_BASE_URL}query/choice/${id}`, post, {headers:{Authorization:`Bearer ${Cookies.get("at")}`}})
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

return response.data

})

<<<<<<< HEAD
=======

export const getChoices = createAsyncThunk("choice/getChoices", async (queryId)=> {

console.log("fetching choices")

const response = await axios.get(`${process.env.REACT_APP_BASE_URL}query/choice/get-query-choices/${queryId}`, {headers:{Authorization:`Bearer ${Cookies.get("at")}`}})

return response.data
})

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
const initialState = {
  choice:{
    title:"",
    queryId:null
  },
<<<<<<< HEAD
=======
  choices:[],
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
  status:"idle",
  error:null,
}

export const choiceSlice = createSlice(
    {
     name:"choice",
     initialState,
<<<<<<< HEAD
     reducers:{},
=======
     reducers:{
      setChoicesState: (state,action) => {
        state.choices = action.payload
      }
     },
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
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
<<<<<<< HEAD
=======
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
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
     }
    }
)

export const choiceState = state => state.choice.choice

<<<<<<< HEAD
=======
export const choicesState = state => state.choice.choices

export const {setChoicesState} = choiceSlice.actions;

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
export default choiceSlice.reducer;

