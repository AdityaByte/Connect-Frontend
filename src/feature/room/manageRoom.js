import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    rooms: []
}

const roomsSlice = createSlice({
    name: "roomsSlice",
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload
        },
        addRoom: (state, action) => {
            state.rooms.push(action.payload)
        },
        removeRoom: (state, action) => {
            state.rooms.pop(action.payload)
        }
    }
})

export const { setRooms, addRoom, removeRoom } = roomsSlice.actions
export default roomsSlice.reducer