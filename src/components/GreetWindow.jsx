import React from "react";
import { useDispatch } from "react-redux";
import { changeTab } from "../feature/tab/manageTabs";

export const GreetWindow = ({ username }) => {
    const dispatch = useDispatch()
    return (
        <div className="w-full h-full flex flex-col justify-center items-center text-white px-10 box-border gap-10">
            <h1 className="text-2xl font-bold">Hey, {username}</h1>
            <span className="text-xl font-bold">Welcome to the connect your chatroom connect with people with your interest</span>
            <button onClick={() => dispatch(changeTab("ROOMS"))} className="px-5 py-3 text-green-900 font-bold text-sm hover:bg-green-400 active:bg-green-600 bg-green-200 rounded">Join rooms</button>
        </div>
    )
}