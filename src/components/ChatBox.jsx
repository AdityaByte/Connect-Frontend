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
    const activeRoom = localStorage.getItem("activeRoom")

    // Managing State via Redux
    const messages = useSelector(state => state.messages.messages) || []
    const dispatch = useDispatch()

    useEffect(() => {

        // If the Active Room is null we are not triggering any change.
        if (!activeRoom || activeRoom.trim() === "") return;

        // Subscribing to the history handler.
        const historySub = subscribe(`/topic/history/${activeRoom}`, (msg) => {
            const historyData = JSON.parse(msg.body)
            dispatch(setMessages(historyData))
        })


        // Subscribing to the chat handler.
        const sub = subscribe(`/topic/chat/${activeRoom}`, (msg) => {
            const data = JSON.parse(msg.body)
            dispatch(addMessage(data))
        })

        // Triggering the history request.
        publish("/app/chat.history", {
            roomId: activeRoom,
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
    }, [connected, currentUser, activeRoom]) // Re-renders when the connection changed or when the currentUser changed or activeRoom changes. It re-renders the changes.

    // Sending the messages to the backend via publishing to the chat.send route.
    const [value, setValue] = useState()

    const sendMessage = () => {

        // If there will be no connection then doing nothing.
        if (!connected) return;

        // Publishing the message to the chat.send route.
        console.log(`Sending message to the backend, user: ${currentUser}, room: ${activeRoom}`)
        let message = inputRef.current?.value
        console.log(`User Message: ${message}`)
        publish(`/app/chat.send`, {
            roomId: activeRoom
        }, {
            sender: currentUser,
            message: message
        })
        dispatch(clearInputBox())
    }

    return (
        <div className="w-full h-full grids-rows-3 overflow-hidden">
            <div className="w-full h-[3rem] lg:px-10 bg-[#1F2328]">
                <RoomTitleTab roomName={activeRoom} />
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
        </div>
    )
}