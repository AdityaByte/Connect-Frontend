import React, { useEffect, useRef, useState } from "react";
import MessageTag from "./MessageTag";
import MessageBoxInput from "./MessageBoxInput";
import { useSocket } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../feature/room/manageMessages";
import RoomTitleTab from "./RoomTitleTab";
import { clearInputBox } from "../feature/chatbox/inputBox";

export const ChatBox = () => {

    // WebSocket hook
    const { connected, subscribe, publish } = useSocket()

    const inputRef = useRef(null)

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const currentUser = localStorage.getItem("username")

    // Managing State via Redux
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages.messages) || []
    const currentRoom = useSelector(state => state.currentRoom.roomData)

    useEffect(() => {

        // If the Active Room is null we are not triggering any change.
        // Checking the object is null or not.
        if (currentRoom.roomId === "" || currentRoom.roomName === "") return;

        // Subscribing to the history handler.
        const historySub = subscribe(`/topic/history/${currentRoom.roomId}`, (msg) => {
            const historyData = JSON.parse(msg.body)
            dispatch(setMessages(historyData))
        })


        // Subscribing to the chat handler.
        const sub = subscribe(`/topic/chat/${currentRoom.roomId}`, (msg) => {
            const data = JSON.parse(msg.body)
            dispatch(addMessage(data))
        })

        // Triggering the history request.
        publish("/app/chat.history", {
            roomId: currentRoom.roomId,
        }, {})

        // Unsubscribing to the websocket channel when the currentUser changes or when the user change the room.
        return () => {
            if (sub && typeof sub.unsubscribe === "function") {
                sub.unsubscribe();
            }
            if (historySub && typeof historySub.unsubscribe === "function") {
                historySub.unsubscribe();
            }
        }
    }, [connected, currentUser, currentRoom]) // Re-renders when the connection changed or when the currentUser changed or currentRoom changes. It re-renders the changes.

    const sendMessage = () => {

        // If there will be no connection then doing nothing.
        if (!connected) return;

        // Publishing the message to the chat.send route.
        console.log(`Sending message to the backend, user: ${currentUser}, room: ${currentRoom.roomName}`)
        let message = inputRef.current?.value
        console.log(`User Message: ${message}`)
        publish(`/app/chat.send`, {
            roomId: currentRoom.roomId
        }, {
            sender: currentUser,
            message: message
        })
        dispatch(clearInputBox())
    }

    return (
        currentRoom.roomId !== "" ?
            (<div className="w-full h-full grids-rows-3 overflow-hidden">
                <div className="w-full h-[3rem] lg:px-10 bg-[#1F2328]">
                    <RoomTitleTab roomName={currentRoom.roomName} />
                </div>
                <div className="w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] overflow-y-auto lg:px-10">
                    {
                        messages.map((message, index) => {
                            return <MessageTag key={index} sender={message.sender} message={message.message} />
                        })
                    }
                </div>
                <div className="w-full h-[3rem]">
                    <MessageBoxInput onClick={sendMessage} inputRef={inputRef} />
                </div>
            </div>)
            :
            (<div className="w-full h-full flex justify-center items-center">
                <span className="text-2xl font-bold text-white">No room joined</span>
            </div>)

    )
}