import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const signupPost = createAsyncThunk("signup/signupPost", async (dataObj) => {

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}account/register`, dataObj)

    return response.data

})

const initialState = {

    userDataObject: {
        email: "",
        password: "",
        firstName:"",
        lastName:"",
        viewingmode: undefined,
        userVisibility: undefined,
        phone:"",
        roles: ["user"]
    },
    status: "idle",
    error: null

}


export const signupSlice = createSlice(
    {
        name: "signup",
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder
                    .addCase(signupPost.pending,(state,action) => {
                        state.status = "loading"
                    })
                    .addCase(signupPost.fulfilled,(state,action) => {
                        state.status = "successful"
                        state.userDataObject = action.payload 
                    })
                    .addCase(signupPost.rejected, (state,action) => {
                        state.status = "failed"
                        state.error = action.error.message 
                    })
        }
    }
)

export const signUpState = state  => state.signup.userDataObject; 
export const signUpStatus = state => state.signup.status;

export default signupSlice.reducer;