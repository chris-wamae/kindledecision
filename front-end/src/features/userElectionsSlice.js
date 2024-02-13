import { ReducerType, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postUserElection = createAsyncThunk("userElections/postUserElection", async (post) => {

  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}UserElections`,post )

  return response.data
})

const initialState = {
 
    userElection: {
        electionId:null,
        userId:null
},
    status:"idle",
    error:null
}

export const userElectionSlice = createSlice({
    name:"userElection",
    initialState,
    reducers: {

    },
    extraReducers(builder)
    {
    builder
    .addCase(postUserElection.pending, (state,action) => {
        state.status = "loading"
    })
    .addCase(postUserElection.fulfilled, (state,action) => {
        state.status = "successful"
        state.userElection  = action.payload
    })
    .addCase(postUserElection.rejected, (state, action) => {
       state.status = "failed"
       state.error = action.error.message
    })

    }


}

)

export const userElectionState = state => state.userElection.userElection;


export default userElectionSlice.reducer;