import React from "react";
import RoomCard from "./RoomCard";
import image from "../assets/images/img-chat-app.png"
import { useSocket } from "../context/SocketContext";
import { useDispatch } from "react-redux";
import { changeTab } from "../feature/tab/manageTabs";

export const RoomTabs = () => {

    // Fetching the localStorage data
    const username = localStorage.getItem("username")

    // WebSocket hook
    const { connected, subscribe, publish } = useSocket()

    // Redux Hooks
    const dispatch = useDispatch()


    // Hard Coded Dummy room
    const roomList = [
        {
            id: "general",
            name: "general room",
            image: image
        }
    ]

    const joinRoom = (e, roomId) => {
        e.preventDefault()
        // Checking connection exists or not if not returning without proceeding further.
        if (!connected) return;

        // Checking the user.
        if (username == null || username.trim() == "") return;

        localStorage.setItem("activeRoom", roomId)

        publish("/app/chat.join", {
            username: username,
            roomID: roomId,
        }, {})

        // When the user joins the room without any error changing the state of UI.
        dispatch(changeTab("CHAT"))
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