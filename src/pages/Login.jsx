import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import { toast } from "react-toastify";
import InputBoxTypePassword from "../components/InputBoxTypePassword";

const Login = () => {

    const loginFormRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const backendURL = import.meta.env.VITE_BACKEND_URL

        const form = loginFormRef.current
        const email = form.elements.email.value
        const password = form.elements.pass.value

        if (email.trim() === "" || password === "") {
            toast.error("Field's can't be empty")
            return
        }

        // Here we need to make request to the backend.
        fetch(`${backendURL}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
            .then(async response => {
                const data = await response.json()
                console.log(data)
                if (response.status !== 200) {
                    throw new Error(data.response || "Something went wrong")
                }
                return data
            })
            .then(response => {
                toast.success("Login Successfull")
                console.log(response)
                // Since I have set this token to the localStorage we can fetch claims in the dashboard through that.
                localStorage.setItem("token", response.token)
                localStorage.setItem("tokenExpiry", response.expiresAt)
                navigate("/dashboard")
            })
            .catch(error => {
                console.log(error.message)
                toast.error(error.message)
            })
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center text-white">
            <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center gap-4">
                <h1 className="font-bold text-4xl">Login</h1>
                <form ref={loginFormRef} onSubmit={handleSubmit} id="loginform" className=" h-[50%] w-full flex flex-col justify-evenly items-center">
                    <InputBox placeholder={"Email"} name={"email"} type={"email"} />
                    <InputBoxTypePassword placeholder={"Password"} name={"pass"} type={"password"} />
                    <Link to={"/signup"} className="underline text-[#AAAAAA]">Don't have an account? Signup</Link>
                    <SubmitButton buttontext={"Login"} />
                </form>
            </div>
        </div>
    )
}

export default Login