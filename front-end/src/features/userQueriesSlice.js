import { ReducerType, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
<<<<<<< HEAD

export const postUserQuery = createAsyncThunk("userQueries/postUserQuery", async (post) => {

  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}UserQueries`,post )
=======
import Cookies from "js-cookie";

export const postUserQuery = createAsyncThunk("userQueries/postUserQuery", async (post) => {

  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}query/add-participant/${post[0]}`,{email:post[1]},{headers:{Authorization:`Bearer ${Cookies.get("at")}`}})
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

  return response.data
})

<<<<<<< HEAD
=======
export const getQueryParticipants = createAsyncThunk("userQueries/getQueryParticipants", async(queryId) => {

console.log("fetching particiants")

const response = await axios.get(`${process.env.REACT_APP_BASE_URL}user/get-query-participants/${queryId}`,{headers:{Authorization:`Bearer ${Cookies.get("at")}`}})

return response.data

})


>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
const initialState = {
 
    userQuery: {
        queryId:null,
        userId:null
},
<<<<<<< HEAD
=======
    queryUsers:[],
    queryParticipants:[],
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    status:"idle",
    error:null
}

export const userQueriesSlice = createSlice({
    name:"userQuery",
    initialState,
    reducers: {
<<<<<<< HEAD

=======
    setQueryUsers : (state,action) => 
    {
        state.queryUsers = action.payload
    }
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
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
<<<<<<< HEAD
=======
    .addCase(getQueryParticipants.pending, (state,action) => {
      state.status = "loading"  
    })
    .addCase(getQueryParticipants.fulfilled, (state,action) => {
    state.status = "successful"
    state.queryParticipants = action.payload
    })
    .addCase(getQueryParticipants.rejected, (state,action) => {
    state.status = "failed"
    state.error = action.error.message
    })
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

    }


}

)

export const userQueryState = state => state.userQuery.userQuery;

<<<<<<< HEAD
=======
export const queryUsersState = state => state.userQuery.queryUsers;

export const queryParticipantsState = state => state.userQuery.queryParticipants;

export const {setQueryUsers} = userQueriesSlice.actions;
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

export default userQueriesSlice.reducer;