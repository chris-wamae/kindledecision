import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const postSelection = createAsyncThunk("selection/postSelection", async (post) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}choice/selection/participate`, post, {headers:{Authorization:`Bearer ${Cookies.get("at")}`}})

    return response.data

})

const initialState = {
    selection: {
    result:null
    },
    status: "idle",
    error: null
}

export const selectionSlice = createSlice(
    {
        name:"selection",
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder
                .addCase(postSelection.pending, (state, action) => {
                    state.status = "loading"
                })
                .addCase(postSelection.fulfilled, (state, action) => {
                    state.status = "succeeded"
                    state.selection = action.payload
                })
                .addCase(postSelection.rejected, (state, action) => {
                    state.status = "failed"
                    state.error = action.error.message
                })
        }
    }


)

export const selectionState = state => state.selection.selection

export default selectionSlice.reducer;



