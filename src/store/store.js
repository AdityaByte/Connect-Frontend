import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "../feature/tab/manageTabs";
import messagesSlice from "../feature/room/manageMessages";
import inputBoxValue from "../feature/chatbox/inputBox";
import currentRoomSlice from "../feature/room/manageCurrentRoom";

export const store = configureStore({
    reducer: {
        tab: tabSlice,
        messages: messagesSlice,
        inputBox: inputBoxValue,
        currentRoom:currentRoomSlice
    }
})