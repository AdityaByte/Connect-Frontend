import React, { useEffect } from "react";
import home from "../assets/svg/home.svg"
import settings from "../assets/svg/settings.svg"
import image from "../assets/images/img-chat-app.png"
import RoomCard from "../components/RoomCard";
import SearchBox from "../components/SearchBox";
import MemberCard from "../components/MemberCard";
import MessageBoxInput from "../components/MessageBoxInput";
import MessageTag from "../components/MessageTag";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const decodedData = decodeToken({ token })
    if (!decodeToken) {
        console.log("unable to decode the token")
        return;
    }

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.clear()
        console.log("Logged out")
        navigate("/")
    }

    return (
        <div className="h-screen w-screen flex text-white">
            <div className="h-full w-[5%] bg-[#413A3A] flex flex-col items-center">
                <div className="realtive h-1/4 w-full flex flex-col justify-evenly items-center">
                    <img src={home} className="w-6 h-6 text-white" />
                    <img src={settings} className="w-6 h-6 text-white" />
                    <FaSignOutAlt size={30} className="w-6 h-6 text-white" onClick={handleSignOut} />
                </div>
                <div className="bottom-4 w-10 h-10 rounded-full bg-white absolute bg-center bg-cover" style={{ backgroundImage: `url(${image})` }}></div>
            </div>
            <div className="h-full w-[25%] bg-[#FFFFFF1A] flex flex-col items-center gap-10">
                <h1 className="h-[10%] w-full text-center flex justify-center items-center text-xl font-bold">Rooms</h1>
                <div className="h-[90%] w-full flex flex-col gap-1">
                    <RoomCard roomImg={image} roomName={"Cat World"} />
                    <RoomCard roomImg={image} roomName={"Welcome Room"} />
                </div>
            </div>
            <div className="h-full w-[50%] relative pt-2 px-2 pb-20">
                <MessageTag senderImg={image} message={"Hey bro what are you doing."} />
                <MessageBoxInput />
            </div>
            <div className="h-full w-[25%] bg-[#FFFFFF1A] flex flex-col items-center justify-between gap-1">
                <h1 className="h-[10%] w-full text-center flex justify-center items-center text-xl font-bold">Members</h1>
                <SearchBox />
                <div className="h-[80%] w-full">
                    <MemberCard pfp={image} memberName={"aditya"} status={true} />
                </div>
            </div>
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