import React from "react";

const MessageBoxInput = () => {
    return (
        <div className="h-[61px] w-full absolute bottom-3 flex justify-center items-center">
            <input type="text" placeholder="Enter Message...." className="h-full w-[70%] bg-[#191C20] box-border px-10 border focus:outline-none focus:right-0" />
            <button className="h-full w-[25%] bg-[#00ADB5] hover:bg-green-600 active:bg-green-800 cursor-pointer font-bold">Send</button>
        </div>
    )
}

export default MessageBoxInput