import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    roomData: {
        roomId: "",
        roomName: ""
    }
}

export const currentRoomSlice = createSlice({
    name: "currentRoom",
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.roomData = action.payload
        }
    }
})

export const {setRoom} = currentRoomSlice.actions
export default currentRoomSlice.reducer