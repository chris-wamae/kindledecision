import { ReducerType, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postUserQuery = createAsyncThunk("userQueries/postUserQuery", async (post) => {

  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}UserQueries`,post )

  return response.data
})

const initialState = {
 
    userQuery: {
        queryId:null,
        userId:null
},
    status:"idle",
    error:null
}

export const userQueriesSlice = createSlice({
    name:"userQuery",
    initialState,
    reducers: {

    },
    extraReducers(builder)
    {
    builder
    .addCase(postUserQuery.pending, (state,action) => {
        state.status = "loading"
    })
    .addCase(postUserQuery.fulfilled, (state,action) => {
        state.status = "successful"
        state.userQuery  = action.payload
    })
    .addCase(postUserQuery.rejected, (state, action) => {
       state.status = "failed"
       state.error = action.error.message
    })

    }


}

)

export const userQueryState = state => state.userQuery.userQuery;


export default userQueriesSlice.reducer;