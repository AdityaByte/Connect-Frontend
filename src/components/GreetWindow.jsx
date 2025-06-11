import React from "react";

export const GreetWindow = ({ username }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center text-white px-10 box-border gap-10">
            <h1 className="text-2xl font-bold">Hey, {username}</h1>
            <span className="text-xl font-bold">Welcome to the connect your chatroom connect with people with your interest</span>
        </div>
    )
}