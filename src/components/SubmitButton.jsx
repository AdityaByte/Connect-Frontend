import React from "react"

const SubmitButton = ({buttontext}) => {
    return (
        <div className="w-[80%] lg:w-full max-w-[500px]">
            <button className="w-full py-4 bg-[#2E3238] text-white font-bold hover:bg-green-600 active:bg-green-700 cursor-pointer">{buttontext}</button>
        </div>
    )
}

export default SubmitButton