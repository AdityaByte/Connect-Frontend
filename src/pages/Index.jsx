// Index.jsx is the first page that was display it routes on /.
import React from "react";
import { Link } from "react-router-dom";

const Index = () => {

    return <>
        <div className="h-screen w-screen flex flex-col box-border text-white justify-center items-center lg:flex-row">
            <div className="w-full h-1/2  lg:w-1/4 lg:h-1/2 flex flex-col items-start px-10 justify-center gap-6">
                <h1 className="text-5xl font-bold">Connect</h1>
                <p className="text-3xl font-bold">Talk Freely.<br></br>Stay Connected</p>
                <Link to="/login">
                    <button className="py-2 px-5 font-bold bg-[#00ADB5] hover:bg-green-600 active:bg-green-700 text-white rounded transition-all duration-300 cursor-pointer">
                    Let's Begin
                    </button>
                </Link>
            </div>
            <div className="w-[14rem] h-[14rem] lg:w-[25rem] lg:h-[25rem] bg-no-repeat bg-center bg-cover rounded-full box-border mb-10" style={{ backgroundImage: `url("connect-logo.png")`}}></div>
        </div>
    </>
}

export default Index