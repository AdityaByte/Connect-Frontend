import React from "react";
import { FaBackward } from "react-icons/fa";
import { useSelector } from "react-redux";
import image from "../assets/images/img-chat-app.png"

const Profile = ({data, closeProfileTab}) => {

    return (
        <div className="absolute h-screen w-screen flex flex-col gap-6 justify-center items-center bg-[#1C1F24]/60 backdrop-blur-sm transition-all duration-200 ease-in-out">
            <FaBackward onClick={closeProfileTab} size={25} className="cursor-pointer text-[#1C1F24] bg-white rounded-full p-1 absolute top-5 left-5 hover:bg-green-600 active:bg-green-900" />
            <img src={image} className="rounded-full size-40 lg:size-60" alt="" />
            <ProfileCard cardFor={"Username"} value={data.username} />
            <ProfileCard cardFor={"Email"} value={data.email} />
        </div>
    )
}


const ProfileCard = ({cardFor, value}) => {
    return (
        <div>
            <label className="text-sm" htmlFor={cardFor}>{cardFor}</label>
            <br></br>
            <input className="w-[300px] bg-[#1F2328]/90 border-box px-3 py-2 mt-1 border text-sm" type="text" value={value} name={cardFor} readOnly/>
        </div>
    )
}

export default Profile