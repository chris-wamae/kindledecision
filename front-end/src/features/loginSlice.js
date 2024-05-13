import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginPost = createAsyncThunk("login/loginPost", async (credentials) => {

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}account/login`, credentials)

    return response.data

})


const initialState =
{
    userDetails:
    {
        ud: null,
        token: ""
    },
    status: "idle",
    error: null
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginPost.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(loginPost.fulfilled, (state,action) => 
        {
            state.status = "succeeded"
            state.userDetails = action.payload
        })
            .addCase(loginPost.rejected, (state,action) => {
            state.status = "failed"
            state.error = action.error.message
            })
    }
}
)

export const loginState = state => state.login.userDetails
export const loginStatus = state => state.login.status;

export default loginSlice.reducer;