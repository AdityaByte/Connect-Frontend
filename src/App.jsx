import React from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OTPPage from "./pages/OTPPage";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute children={
                <SocketProvider>
                  <Dashboard />
                </SocketProvider>
            }
            />
          }
        />
        <Route path="/signup/otp" element={<OTPPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={500} />
    </BrowserRouter>
  )
}

export default App