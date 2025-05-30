// Index.jsx is the first page that was display it routes on /.
import React from "react";
import image from '../assets/images/img-chat-app.png'
import { Link } from "react-router-dom";

const Index = () => {

    return <>
        <div className="h-screen w-screen flex box-border text-white justify-center items-center flex-wrap">
            <div className="w-1/4 h-1/2 flex flex-col items-start justify-center gap-6">
                <h1 className="text-5xl font-bold">Connect</h1>
                <p className="text-3xl font-bold">Talk Freely.<br></br>Stay Connected</p>
                <Link to="/login">
                    <button className="py-2 px-5 font-bold bg-[#00ADB5] hover:bg-green-600 active:bg-green-700 text-white rounded transition-all duration-300 cursor-pointer">
                    Let's Begin
                    </button>
                </Link>
            </div>
            <div className="w-1/4 h-1/2 bg-no-repeat bg-center bg-cover rounded-full" style={{ backgroundImage: `url(${image})`}}></div>
        </div>
    </>
}

export default Index