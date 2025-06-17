import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    joinedRoomData: {
        roomId: "",
        roomName: ""
    }
}

export const joinedRoomSlice = createSlice({
    name: "joinedRoom",
    initialState,
    reducers: {
        setJoinedRoom: (state, action) => {
            state.joinedRoomData = action.payload
        }
    }
})

export const { setJoinedRoom } = joinedRoomSlice.actions
export default joinedRoomSlice.reducer