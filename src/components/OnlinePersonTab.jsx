import React from "react";
import SearchBox from "./SearchBox";
import MemberCard from "./MemberCard";
import image from "../assets/images/img-chat-app.png"

export const OnlinePersonTab = () => {
    return (
        <div className="h-full w-full bg-[#FFFFFF1A] flex flex-col items-center justify-between gap-1">
            <h1 className="h-[5%] w-full text-center flex justify-center items-center text-xl font-bold">Members</h1>
            <SearchBox />
            <div className="h-[85%] w-full">
                <MemberCard pfp={image} memberName={"aditya"} status={true} />
            </div>
        </div>
    )
}