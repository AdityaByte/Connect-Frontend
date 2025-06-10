import React, { useRef, useState } from "react";

const MessageBoxInput = () => {
    
    const inputRef = useRef(null)
    const [message, setMessage] = useState("")

    const sendMessage = () => {
        console.log("sending message...", message)
        setMessage("")
        inputRef.current?.focus()
    }

    return (
        <div className="text-sm h-[45px] lg:h-[61px] w-full absolute bottom-3 flex justify-center items-center">
            <input
                type="text"
                placeholder="Enter Message...."
                className="h-full w-[70%] bg-[#191C20] box-border px-3 lg:px-10 border focus:outline-none focus:right-0"
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        e.preventDefault()
                        sendMessage()
                    }
                }}
            />
            <button onClick={sendMessage} className="h-full w-[25%] bg-[#00ADB5] hover:bg-green-600 active:bg-green-800 cursor-pointer font-bold">Send</button>
        </div>
    )
}

export default MessageBoxInput