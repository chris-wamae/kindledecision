import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postChoice = createAsyncThunk("choice/postChoice", async (post) =>
{

const response = await axios.post((`${process.env.REACT_APP_BASE_URL}choices`,post))

return response.data

})

const initialState = {
  choice:{
    title:"",
    electionId:null
  },
  status:"idle",
  error:null,
}

export const choiceSlice = createSlice(
    {
     name:"choice",
     initialState,
     reducers:{},
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
     }
    }
)

export const choiceState = state => state.choice.choice

export const {initialCreate} = postChoice.actions;

export default choiceSlice.reducer;

