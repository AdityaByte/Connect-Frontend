import React from "react";
import { FaBars} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Admin = () => {

    const openDrawer = () => {
        document.querySelector("#drawer").classList.remove("hidden")
    }

    const closeDrawer = () => {
        document.querySelector("#drawer").classList.add("hidden")
    }

    return (
        <div className="relative h-screen w-screen text-white bg-[#1E1E1E] overflow-hidden">
            <nav className="h-1/16 flex items-center px-5 justify-between">
                <span className="font-bold text-xl">Admin</span>
                <FaBars size={20} onClick={openDrawer}/>
            </nav>
            <div className="flex-1 overflow-auto h-17/18 w-full flex flex-col items-center justify-evenly gap-10 py-4">
                <HomeCard val1={"Total Users"} val2={"45"} />
                <HomeCard val1={"Active Users"} val2={"10"} />
                <HomeCard val1={"Totals Rooms"} val2={"2"} />
            </div>
            <Drawer onClose={closeDrawer} />
        </div>
    )
}

const HomeCard = ({ val1, val2 }) => {
    return (
        <div className="w-3/4 min-h-[160px] flex flex-col justify-center items-center bg-green-100 rounded-md border-box transition-all">
            <span className="text-xl text-green-900">{val1}</span>
            <span className="text-[3rem] text-green-900">{val2}</span>
        </div>
    )
}

const Drawer = ({onClose}) => {

    const drawerItems = {
        roomInfo: "Room Information",
        userInfo: "User Information"
    }

    return (
        <div id="drawer" className="hidden absolute h-full w-[80%] bg-teal-900/60 top-0 left-0 backdrop-blur-[10px] flex flex-col" >
            <FaX onClick={onClose} size={25} className="text-white absolute top-4 right-5 bg-red-500 rounded-full p-1" />
            <h1 className="h-[10%] flex items-center px-10 text-2xl">Menu</h1>
            <ul className="h-[90%] flex flex-col gap-5 text-blue-300">
                {Object.entries(drawerItems).map(([key, label], index) => (
                        <li key={index} className="cursor-pointer hover:text-white px-10">
                            {label}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Admin