import React from "react";
import { FaArrowDown, FaArrowLeft, FaBackward } from "react-icons/fa";

const RoomTitleTab = ({ roomName }) => {
    return (
        <div className="flex w-full h-full justify-between items-center px-4">
            <FaArrowLeft className="bg-white rounded-full text-green-900 p-1" size={20} />
            <span className="font-bold">{roomName}</span>
            <FaArrowDown className="bg-white rounded-full text-green-900 p-1" size={20} />
        </div>
    )
}

export default RoomTitleTab