import React from "react";
import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";

const Login = () => {
    return(
        <div className="h-screen w-screen flex justify-center items-center text-white">
            <div className="w-1/2 h-screen flex flex-col justify-center items-center gap-4">
                <h1 className="font-bold text-4xl">Login</h1>
                <div className=" h-[50%] w-full flex flex-col justify-evenly items-center">
                    <InputBox placeholder={"Email"} type={"email"} />
                    <InputBox placeholder={"Password"} type={"password"} />
                    <Link to={"/signup"}>
                        <a className="underline text-[#AAAAAA]">Don't have an account? Signup</a>
                    </Link>
                    <SubmitButton buttontext={"Login"} />
                </div>
            </div>
        </div>
    )
}

export default Login