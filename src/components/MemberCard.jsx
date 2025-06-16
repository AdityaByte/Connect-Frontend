import React from "react"

const MemberCard = ({ pfp, memberName, status }) => {
    return (
        <div className="w-full px-4 py-2 h-max-[41px] bg-[#1E1E1E] border-white border flex justify-between items-center">
            <img src={pfp} alt="" className="w-10 h-10 rounded-full" />
            <span className="font-bold">{memberName}</span>
            <span className="" style={status === "ACTIVE" ? { color: "green" } : { color: "gray" }}>{status === "ACTIVE" ? "Online" : "Offline"}</span>
        </div>
    )
}

export default MemberCard