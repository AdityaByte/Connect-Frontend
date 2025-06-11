import React, { useEffect, useRef, useState } from "react";
import MessageTag from "./MessageTag";
import MessageBoxInput from "./MessageBoxInput";
import { useSocket } from "../context/SocketContext";

export const ChatBox = () => {

    const backendURL = import.meta.env.VITE_BACKEND_URL
    const currentUser = localStorage.getItem("username")
    const activeRoom = localStorage.getItem("activeRoom")

    const { connected, subscribe, publish } = useSocket()

    const inputRef = useRef(null)
    const [messages, setMessage] = useState([])

    useEffect(() => {

        if (activeRoom === null && activeRoom === "") return;

        // Publish a request for history
        publish("/app/chat.history", {}, {
            requester: currentUser,
            roomID: activeRoom,
        })

        // Subscribing to the unique channel for fetching the history.
        const historySub = subscribe(`/user/${currentUser}/queue/${activeRoom}`, (msg) => {
            const historyData = JSON.parse(msg.body)
            console.log(historyData)
            setMessage(historyData)
        })

        const sub = subscribe(`/topic/chat/${activeRoom}`, (msg) => {
            const data = JSON.parse(msg.body)
            setMessage((prev) => [...prev, data])
        })

        return () => {
            if (sub && typeof sub.unsubscribe === "function") {
                sub.unsubscribe();
            }
        }
    }, [connected, currentUser, activeRoom]) // Re-renders when the connection changed or when the currentUser changed or activeRoom changes. It re-renders the changes.


    const sendMessage = () => {
        if (!connected) return;
        // Here we have to publish the message at the route.
        console.log("sending message")
        const activeRoom = localStorage.getItem("activeRoom").trim()
        console.log(currentUser, activeRoom)
        let msg = inputRef.current?.value
        console.log(msg)
        publish(`/app/chat.send`, {
            roomId: activeRoom
        }, {
            sender: currentUser,
            message: msg
        })
    }

    return (
        <div className="h-full w-full relative pt-2 px-2 pb-20 overflow-x-hidden">
            <div className="h-[5%] flex justify-center items-center bg-green-400 font-bold mb-1">
                <span>{activeRoom}</span>
            </div>
            <div>
                {messages.map((msg, index) => (
                    <MessageTag key={index} sender={msg.sender} message={msg.message} />
                ))}
                <MessageBoxInput inputRef={inputRef} onClick={sendMessage} />
            </div>
        </div>
    )
}