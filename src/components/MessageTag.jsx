import React from "react"
import senderImg from "../assets/images/img-chat-app.png"

const MessageTag = ({sender, message}) => {
    return (
        <div className="flex px-2 py-1 w-full items-center gap-2">
            <img src={senderImg} alt="" className=" w-8 h-8 lg:w-10 lg:h-10 rounded-full" />
            <div>
                <span className="text-[10px] text-black px-1 bg-green-100">{sender}</span>
                <p className="text-[13px]">{message}</p>
            </div>
        </div>
    )
}

export default MessageTag