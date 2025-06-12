import React, { useEffect, useState } from "react";
import image from "../assets/images/img-chat-app.png"
import { FaHome, FaCog, FaUserFriends, FaSignOutAlt, FaComments, FaWeixin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RoomTabs } from "../components/RoomsTab";
import { ChatBox } from "../components/ChatBox";
import { OnlinePersonTab } from "../components/OnlinePersonTab";
import { useSocket } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../feature/tab/manageTabs";
import {GreetWindow} from "../components/GreetWindow"

const Dashboard = () => {

    // LocalStorage Data
    const token = localStorage.getItem("token")

    // Navigation Hook
    const navigate = useNavigate()

    // WebSocket hook
    const { connected, subscribe, publish } = useSocket()

    // Redux hooks
    const dispatch = useDispatch()
    const currentTab = useSelector(state => state.tab)

    const decodedData = decodeToken({ token })

    if (!decodedData) {
        console.log("Unable to decode the token")
        return;
    }

    const username = decodedData.sub
    localStorage.setItem("username", username)

    const [message, setMessage] = useState("")

    useEffect(() => {

        if (!connected) return;

        const subscription = subscribe("/topic/greet", (message) => {
            console.log(message.body)
            setMessage(message)
        })

        return () => {
            if (subscription) subscription.unsubscribe()
        }

    }, [connected, subscribe])


    useEffect(() => {
        if (!connected) return;
        let greeted = sessionStorage.getItem("greeted")
        if (!greeted) {
            publish("/app/greet", {}, {
                username: username,
                role: "USER",
                status: "ACTIVE",
            });
            sessionStorage.setItem("greeted", "true")
        }
    }, [connected]);

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.clear()
        console.log("Logged out successfull")
        navigate("/")
    }

    return (
        <div className="h-screen w-screen flex text-white">
            <div className="h-screen w-[15%] bg-[#413A3A] flex flex-col justify-between items-center">
                <div className="realtive h-1/4 w-full flex flex-col justify-evenly items-center">
                    <FaHome onClick={() => dispatch(changeTab("HOME"))} size={30} className="w-6 h-6 text-white cursor-pointer hover:text-green-400 active:text-green-700" style={currentTab === "HOME" ? { color: "green" } : {}} />
                    <FaWeixin onClick={() => dispatch(changeTab("CHAT"))} size={30} className="w-6 h-6 text-white cursor-pointer hover:text-green-400 active:text-green-700" style={currentTab === "CHAT" ? { color: "green" } : {}} />
                    <FaComments onClick={() => dispatch(changeTab("ROOMS"))} size={30} className="w-6 h-6 text-white cursor-pointer hover:text-green-400 active:text-green-700" style={currentTab === "ROOMS" ? { color: "green" } : {}} />
                    <FaUserFriends onClick={() => dispatch(changeTab("USERS"))} size={30} className="w-6 h-6 text-white cursor-pointer hover:text-green-400 active:text-green-700" style={currentTab === "USERS" ? { color: "green" } : {}} />
                    <FaCog onClick={() => dispatch(changeTab("SETTINGS"))} size={30} className="w-6 h-6 text-white cursor-pointer hover:text-green-400 active:text-green-700" style={currentTab === "SETTINGS" ? { color: "green" } : {}} />
                    <FaSignOutAlt onClick={handleSignOut} size={30} className="w-6 h-6 text-white cursor-pointer hover:text-red-400 active:text-red-700" />
                </div>
                <div className="bottom-4 w-10 h-10 rounded-full bg-white mb-3 bg-center bg-cover" style={{ backgroundImage: `url(${image})` }}></div>
            </div>
            {currentTab === "CHAT" && (
                <div className="w-[90%] h-full">
                    <ChatBox />
                </div>
            )}
            {currentTab === "ROOMS" && (
                <div className="w-[90%] h-full">
                    <RoomTabs />
                </div>
            )}
            {currentTab === "HOME" && (
                <div className="w-[90%] h-full">
                    <GreetWindow username={username} />
                </div>
            )}
            {currentTab === "USERS" && (
                <div className="w-[90%] h-full">
                    <OnlinePersonTab />
                </div>
            )}
        </div>
    )
}

const decodeToken = ({ token }) => {
    const base64url = token.split('.')[1]
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''))

    const decodedData = JSON.parse(jsonPayload);
    return decodedData
}

export default Dashboard