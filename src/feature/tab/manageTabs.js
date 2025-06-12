import { createSlice } from "@reduxjs/toolkit"

const initialState = "HOME"

export const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        changeTab: (state, action) => {
            return action.payload
        }
    }
})

export const { changeTab } = tabSlice.actions

export default tabSlice.reducer