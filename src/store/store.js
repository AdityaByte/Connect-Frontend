import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "../feature/tab/manageTabs";
import messagesSlice from "../feature/room/manageMessages";
import inputBoxValue from "../feature/chatbox/inputBox";
import joinedRoomSlice from "../feature/room/manageJoinedRoom";
import roomsSlice from "../feature/room/manageRoom";

export const store = configureStore({
    reducer: {
        tab: tabSlice,
        messages: messagesSlice,
        inputBox: inputBoxValue,
        joinedRoom: joinedRoomSlice,
        roomsSlice: roomsSlice
    }
})