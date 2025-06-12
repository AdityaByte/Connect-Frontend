import React, { useEffect, useRef } from "react";
import MessageTag from "./MessageTag";
import MessageBoxInput from "./MessageBoxInput";
import { useSocket } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../feature/room/manageMessages";

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
    }

    return (
        <div className="h-full w-full relative pt-2 px-2 pb-20 overflow-x-hidden">
            <div className="h-[5%] flex justify-center items-center bg-green-400 font-bold mb-1">
                <span>{activeRoom}</span>
            </div>
            <div>
                {
                    messages.map((msg, index) => (
                        <MessageTag key={index} sender={msg.sender} message={msg.message} />
                    ))}
                <MessageBoxInput inputRef={inputRef} onClick={sendMessage} />
            </div>
        </div>
    )
}