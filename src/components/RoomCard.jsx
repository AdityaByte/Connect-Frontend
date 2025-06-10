import React from "react"
import { useSocket } from "../context/SocketContext"

const RoomCard = ({ roomImg, roomName }) => {

    const { connected, subscribe, publish } = useSocket()
    const username = localStorage.getItem("username")

    const joinRequest = (e) => {
        e.preventDefault()
        // Here what we have to do we have to send a join request to the server.

        if (!connected) return;

        // Now have to publish the message.
        publish(`/app/chat.join`, {username: username, roomId: "room1"}, {})

        localStorage.setItem("activeRoom", "room1")
    }

    return (
        <div className="w-full px-4 py-2 h-max-[41px] bg-[#1E1E1E] border-white border flex justify-between items-center">
            <img src={roomImg} alt="" className="w-10 h-10 rounded-full" />
            <span className="font-bold">{roomName}</span>
            <button onClick={joinRequest} className="cursor-pointer bg-[#00ADB5] text-sm font-bold px-3 py-1 hover:bg-green-600 active:bg-green-700 rounded">Open</button>
        </div>
    )
}

export default RoomCard