import React, { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import MemberCard from "./MemberCard";
import image from "../assets/images/img-chat-app.png"
import { useSocket } from "../context/SocketContext";

export const OnlinePersonTab = () => {

    const [users, setUsers] = useState([])
    const { connected, subscribe, publish } = useSocket()


    useEffect(() => {
        if (!connected) return;

        const sub = subscribe("/topic/users", (msg) => {
            const data = JSON.parse(msg.body)
            setUsers(data)
        })

        publish("/app/users", {}, {})

        return () => {
            if (sub && typeof sub.unsubscribe == "function") {
                sub.unsubscribe()
            }
        }
    }, [connected])

    return (
        <div className="h-full w-full bg-[#FFFFFF1A] flex flex-col items-center justify-between gap-1">
            <h1 className="h-[5%] w-full text-center flex justify-center items-center text-xl font-bold">Members</h1>
            <SearchBox />
            <div className="h-[85%] w-full flex flex-col gap-1 overflow-y-auto">
                {
                    users.map((user) => {
                        return <MemberCard key={user.id} pfp={image} memberName={user.username} status={user.status} />
                    })
                }
            </div>
        </div>
    )
}