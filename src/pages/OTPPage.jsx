import { useEffect, useRef, useState } from "react"
import InputBox from "../components/InputBox"
import SubmitButton from "../components/SubmitButton"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const OTPPage = () => {

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const otpFormRef = useRef(null)

    const [email, setEmail] = useState("")

    useEffect(() => {
        const storedEmail = localStorage.getItem("email")
        setEmail(storedEmail || "")
    }, [])

    const handleOTPForm = async (event) => {
        event.preventDefault()
        const form = otpFormRef.current
        const otp = form.elements.otp.value

        if (email == null || email.trim() == "") {
            toast.error("Can't proceed further! Bad Request")
            return
        }

        await fetch(`${backendURL}/signup/verifyOTP`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "otp": otp,
                "email": email
            })
        })
            .then(async response => {
                const data = await response.json()
                if (response.status != 201) {
                    throw new Error(data.response)
                }
                return data
            })
            .then(data => {
                console.log(data.response)
                toast.success(data.response)
                localStorage.setItem("authToken", "fake-token")
                localStorage.remove("email")
                navigate("/dashboard")
            })
            .catch(error => {
                console.log(error.message)
                toast.error(error.message)
            })
    }

    // Resend OTP functionality.

    const [resendCount, setResendCount] = useState(0)

    const resendOTP = async () => {

        if (resendCount === 3) {
            toast.error("Resend limit Reached! Try again later.")
            return;
        }
        setResendCount(count => count + 1)

        // We need to fetch out the email for the session ok.

        if (email === null || email.trim() === "") {
            toast.error("Something went wrong! Bad request.")
            return;
        }

        // Here we need to resend the otp ok.
        await fetch(`${backendURL}/signup/resendOTP`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "email": email
            })
        })
        .then(async response => {
            const data = await response.json()
            if (response != 200) {
                throw new Error(data.response)
            }
            return data
        })
        .then(async data => {
            console.log(data.response)
            toast.success(data.response)
            setTimer(120)
        })
        .catch(async error => {
            console.error(error.message)
            toast.error(error.message)
        })
    }

    // Handling the functionality of UI update ok
    const [timer, setTimer] = useState(120) // Timer is the state variable and setTimer is the function for updating it.

    // It runs when the timer variable changes.
    useEffect(() => {

        if (!email || email.trim() === "") return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev === 0) {
                    clearInterval(interval)
                    return 0
                }
                return prev-1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // function for formating the time in MM:SS format
    const formatTime = (time) => {
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-5 text-white">
            <h1 className="text-2xl font-bold">One time Password</h1>
            <form ref={otpFormRef} onSubmit={handleOTPForm} className="flex flex-col w-1/3 h-1/4 justify-evenly items-center">
                <InputBox placeholder={"Enter OTP"} name={"otp"} type={"text"} />
                {/* We need to include a timer and the resend button functionality ok */}
                <div className="flex w-full justify-between items-center">
                    <span id="timer" style={{ color : timer === 0 ? 'red' : 'green'}}>Remaining time: {formatTime(timer)}</span>
                    <button disabled={resendCount === 3 || !email || email.trim() === ""} className="text-[#AAAAAA] text-sm hover:text-[#white] cursor-pointer" onClick={resendOTP}>Resend OTP : Limit {resendCount === 3 ? "Reached" : resendCount}</button>
                </div>
                <SubmitButton buttontext={"Submit"} />
            </form>
        </div>
    )
}

export default OTPPage