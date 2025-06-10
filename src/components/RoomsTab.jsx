import React from "react";
import RoomCard from "./RoomCard";
import image from "../assets/images/img-chat-app.png"

export const RoomTabs = () => {
    return (
        <div className="h-full w-full bg-[#FFFFFF1A] flex flex-col items-center gap-10">
            <h1 className="h-[6%] w-full text-center flex justify-center items-center text-xl font-bold">Rooms</h1>
            <div className="h-[95%] w-full flex flex-col gap-1">
                <RoomCard roomImg={image} roomName={"Cat World"} />
                <RoomCard roomImg={image} roomName={"Welcome Room"} />
            </div>
        </div>
    )
}