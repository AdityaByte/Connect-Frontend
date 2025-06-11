import React from "react";
import RoomCard from "./RoomCard";
import image from "../assets/images/img-chat-app.png"
import { useSocket } from "../context/SocketContext";

export const RoomTabs = ({ setCurrentTab }) => {

    const { connected, subscribe, publish } = useSocket()

    const roomList = [
        {
            id: "general",
            name: "general room",
            image: image
        }
    ]

    const username = localStorage.getItem("username")

    const joinRoom = (e, roomId) => {
        e.preventDefault()
        console.log("Joining room:", roomId)

        // Here have to send a request to the backend for joining the room.
        if (!connected) return;
        if (username == null || username.trim() == "") return;
        // Setting the roomId as active room only if the user is connected to the socket server.
        localStorage.setItem("activeRoom", roomId)

        publish("/app/chat.join", {
            username: username,
            roomID: roomId,
        }, {})

        // When the user joins the room without any error we have to redirect it to the chat window.
        setCurrentTab("CHAT")
    }

    return (
        <div className="h-full w-full bg-[#FFFFFF1A] flex flex-col items-center gap-10">
            <h1 className="h-[6%] w-full text-center flex justify-center items-center text-xl font-bold">Rooms</h1>
            <div className="h-[95%] w-full flex flex-col gap-1">
                {roomList.map((room) => {
                    return (<RoomCard
                        key={room.id}
                        roomImg={room.image}
                        roomName={room.name}
                        onClick={(e) => joinRoom(e, room.id)}
                    />)
                })}
            </div>
        </div>
    )
}