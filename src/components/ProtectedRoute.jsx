import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

    console.log("Checking for the route is protected or not.")

    const [isChecking, setIsChecking] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            console.log("Checking Authentication")
            const token = localStorage.getItem("token")
            const token_expiry = localStorage.getItem("tokenExpiry")

            if (!token || !token_expiry) {
                setIsAuthenticated(false)
                setIsChecking(false)
                return
            }

            const now = new Date();
            const expiryDate = new Date(token_expiry)
            if (now >= expiryDate) {
                console.log("token expired")
                setIsAuthenticated(false)
                setIsChecking(false)
                return
            }

            try {

                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-token`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setIsAuthenticated(res.ok)

            } catch (err) {
                console.error("Token verification failed", err)
                setIsAuthenticated(false)
            } finally {
                setIsChecking(false)
            }
        }

        checkAuth()
    }, [])

    if (isChecking) {
        return (
            <div className="h-screen w-screen flex justify-center items-center text-2xl text-white font-bold">
                Loading....
            </div>
        )
    }

    return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute