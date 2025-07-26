'use client';
import { useState } from "react";
import axios from "axios";
export default function OTP () {
    const email = new URLSearchParams(window.location.search).get("email");

    const submitOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await axios.post("/api/auth/verify-otp", { email: email, otp });
        console.log("OTP submitted:", otp);

        if(result.data.success) {
           
                alert("OTP verified successfully!");
                window.location.href = "/login"; // Redirect to login or another page
            } else {
                alert("Invalid or expired OTP. Please try again.");
            }
        }
    

    const [otp, setOtp] = useState<string>("");
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
                <p className="mb-6">Please enter the OTP sent to your email.</p>
                <form>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        onClick={submitOTP}
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    )
}