import React, { useRef } from "react";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

    const signupFormRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = signupFormRef.current
        const username = form.elements.username.value.trim()
        const email = form.elements.email.value.trim()
        const password = form.elements.pass.value.trim()
        const confirmPassword = form.elements.cpass.value.trim()

        if (username === "" || username.length < 5) {
            toast.error("Username is invalid!")
            return;
        } else if (password != confirmPassword) {
            toast.error("Passwords are not same!")
            return;
        } else if (password.length <= 6) {
            toast.error("Password should not be smaller than 6 characters!")
            return;
        }

        // Else here we need to send the data ok

        const backendURL = import.meta.env.VITE_BACKEND_URL;

        await fetch(`${backendURL}/auth/signup`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })
            .then(async response => {
                const data = await response.json()
                console.log(data)
                if (response.status != 200) {
                    throw new Error(data.response || "Something went wrong")
                }
                // Else we need to send the response.
                return data
            })
            .then(async data => {
                toast.success(data.response)
                localStorage.setItem("email", email)
                navigate("/signup/otp")
            })
            .catch(async error => {
                console.log(error.message)
                toast.error(error.message)
            })
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form ref={signupFormRef} onSubmit={handleSubmit} className="w-1/2 h-full text-white flex flex-col justify-center items-center gap-7">
                <h1 className="font-bold text-4xl">Signup</h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-10 p-4 w-full">
                    <InputBox placeholder={"Username"} type={"text"} name={"username"} />
                    <InputBox placeholder={"Email"} type={"email"} name={"email"} />
                    <InputBox placeholder={"Password"} type={"password"} name={"pass"} />
                    <InputBox placeholder={"Confirm Password"} type={"password"} name={"cpass"} />
                </div>
                <Link className="underline text-[#AAAAAA]" to={"/login"}>Already have an account? Login</Link>
                <SubmitButton buttontext={"Signup"} />
            </form>

        </div>
    )
}

export default Signup
