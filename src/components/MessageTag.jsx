import React from "react"

const MessageTag = ({senderImg, message}) => {
    return (
        <div className="flex px-2 py-1 w-full items-center gap-2">
            <img src={senderImg} alt="" className="w-10 h-10 rounded-full" />
            <p className="text-md">{message}</p>
        </div>
    )
}

export default MessageTag