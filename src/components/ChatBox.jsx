    import React, { useEffect, useRef, useState } from "react";
    import MessageTag from "./MessageTag";
    import MessageBoxInput from "./MessageBoxInput";
    import image from "../assets/images/img-chat-app.png"
    import { useSocket } from "../context/SocketContext";

    export const ChatBox = ({ currentlyJoinedRoom }) => {

        const backendURL = import.meta.env.VITE_BACKEND_URL

        const { connected, subscribe, publish } = useSocket()

        const inputRef = useRef(null)

        const [messages, setMessage] = useState([])

        useEffect(() => {
            const activeRoom = localStorage.getItem("activeRoom")
            if (activeRoom === null && activeRoom === "") return;
            const sub = subscribe(`/topic/chat/${activeRoom}`, (msg) => {
                const data = JSON.parse(msg.body)
                setMessage((prev) => [...prev, data])
            })

            return () => {
                if (sub && typeof sub.unsubscribe === "function") {
                    sub.unsubscribe();
                }
            }
        }, [connected])


        const sendMessage = () => {
            if (!connected) return;
            // Here we have to publish the message at the route.
            console.log("sending message")
            const username = localStorage.getItem("username")
            const activeRoom = localStorage.getItem("activeRoom").trim()
            console.log(username, activeRoom)
            let msg = inputRef.current?.value
            console.log(msg)
            publish(`/app/chat.send`, {}, {
                sender: username,
                message: msg,
                roomId: activeRoom
            })
        }

        return (
            <div className="h-full w-full relative pt-2 px-2 pb-20 overflow-x-hidden">
                <div className="h-[5%] flex justify-center items-center bg-green-400 font-bold mb-1">
                    <span>{currentlyJoinedRoom}</span>
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