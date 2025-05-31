import React from "react";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form className="w-1/2 h-full text-white flex flex-col justify-center items-center gap-7">
                <h1 className="font-bold text-4xl">Signup</h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-10 p-4 w-full">
                    <InputBox placeholder={"Username"} type={"text"} />
                    <InputBox placeholder={"Email"} type={"email"} />
                    <InputBox placeholder={"Password"} type={"password"} />
                    <InputBox placeholder={"Confirm Password"} type={"password"} />
                </div>
                <Link className="underline text-[#AAAAAA]" to={"/login"}>Already have an account? Login</Link>
                <SubmitButton buttontext={"Signup"} />
            </form>
        </div>
    )
}

export default Signup
