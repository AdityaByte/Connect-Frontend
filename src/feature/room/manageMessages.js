import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messages: []
}

export const messagesSlice = createSlice({
    name : 'messages',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        }
    }
})

export const { addMessage, setMessages } = messagesSlice.actions

export default messagesSlice.reducer