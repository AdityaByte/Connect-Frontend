import React, { useRef } from "react";
import MessageTag from "./MessageTag";
import MessageBoxInput from "./MessageBoxInput";
import image from "../assets/images/img-chat-app.png"

export const ChatBox = () => {

    const inputRef = useRef(null)

    const sendMessage = () => {

    }

    return (
        <div className="h-full w-full relative pt-2 px-2 pb-20 overflow-x-hidden">
            <div className="h-[5%] flex justify-center items-center bg-green-400 font-bold mb-1">
                <span>Room Name</span>
            </div>
            <div>
                <MessageTag senderImg={image} message={"message"} />
                <MessageTag senderImg={image} message={"message"} />
                <MessageBoxInput inputRef={inputRef} onClick={sendMessage} />
            </div>
        </div>
    )
}