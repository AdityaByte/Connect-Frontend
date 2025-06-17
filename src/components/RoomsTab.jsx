import React from "react";
import RoomCard from "./RoomCard";
import image from "../assets/images/img-chat-app.png"
import { useSocket } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../feature/tab/manageTabs";
import { useEffect } from "react";
import { setJoinedRoom } from "../feature/room/manageJoinedRoom";
import { setRooms } from "../feature/room/manageRoom";

export const RoomTabs = () => {

    // Fetching the localStorage data
    const username = localStorage.getItem("username")

    // WebSocket hook
    const { connected, subscribe, publish } = useSocket()

    // Redux Hooks
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.roomsSlice.rooms)

    useEffect(() => {
        if (rooms.length === 0) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/room/getall`, {
                method: "GET"
            })
                .then(async response => {
                    const data = await response.text();
                    if (!data) {
                        return []
                    }
                    return JSON.parse(data)
                })
                .then(data => {
                    dispatch(setRooms(data))
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [])

    const joinRoom = (e, roomId, roomName) => {
        e.preventDefault()
        // Checking connection exists or not if not returning without proceeding further.
        if (!connected) return;

        // Checking the user.
        if (username == null || username.trim() == "") return;

        publish("/app/chat.join", {}, {
            username: username,
            roomId: roomId,
        })

        // When the user joins the room without any error changing the state of UI.
        dispatch(setJoinedRoom({
            roomId: roomId,
            roomName: roomName
        }))
        dispatch(changeTab("CHAT"))
    }

    return (
        <div className="h-full w-full bg-[#FFFFFF1A] flex flex-col items-center gap-10">
            <h1 className="h-[6%] w-full text-center flex justify-center items-center text-xl font-bold">Rooms</h1>
            <div className="h-[95%] w-full flex flex-col gap-1">
                {rooms.map((room) => {
                    return (<RoomCard
                        key={room.roomId}
                        roomImg={image}
                        roomName={room.roomName}
                        onClick={(e) => joinRoom(e, room.roomId, room.roomName)}
                    />)
                })}
            </div>
        </div>
    )
}