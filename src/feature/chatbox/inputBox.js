import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    inputBoxValue: ""
}

export const inputSlice = createSlice({
    name: 'inputBox',
    initialState,
    reducers: {
        setInputBoxValue: (state, action) => {
            state.inputBoxValue = action.payload
        },
        clearInputBox: (state, action) => {
            state.inputBoxValue = ""
        }
    }
})

export const { setInputBoxValue, clearInputBox } = inputSlice.actions

export default inputSlice.reducer