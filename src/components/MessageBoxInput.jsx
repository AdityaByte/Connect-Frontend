import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputBoxValue } from "../feature/chatbox/inputBox";

const MessageBoxInput = ({ inputRef, onClick }) => {

    // Redux Hook
    const dispatch = useDispatch()
    const inputValue = useSelector(state => state.inputBox.inputBoxValue)

    return (
        <div className="text-sm h-[45px] lg:h-[61px] bottom-3 flex justify-center items-center">
            <input
                type="text"
                placeholder="Enter Message...."
                className="h-full w-[70%] box-border px-3 lg:px-10 border focus:outline-none focus:right-0 border-none bg-[#1F2328]"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => dispatch(setInputBoxValue(e.target.value))}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        e.preventDefault()
                        onClick()
                    }
                }}
            />
            <button onClick={onClick} className="h-full w-[25%] bg-teal-900 hover:bg-teal-600 active:bg-teal-800 cursor-pointer font-bold">Send</button>
        </div>
    )
}

export default MessageBoxInput