// 'use client';
// import { useState } from "react";
// import axios from "axios";
// export default function OTP () {
//     const email = new URLSearchParams(window.location.search).get("email");

//     const submitOTP = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const result = await axios.post("/api/auth/verify-otp", { email: email, otp });
//         console.log("OTP submitted:", otp);

//         if(result.data.success) {
           
//                 alert("OTP verified successfully!");
//                 window.location.href = "/login"; // Redirect to login or another page
//             } else {
//                 alert("Invalid or expired OTP. Please try again.");
//             }
//         }
    

//     const [otp, setOtp] = useState<string>("");
//     return (
//         <div className="flex items-center justify-center h-screen">
//             <div className="bg-white p-8 rounded shadow-md w-96">
//                 <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
//                 <p className="mb-6">Please enter the OTP sent to your email.</p>
//                 <form>
//                     <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         className="w-full p-2 border border-gray-300 rounded mb-4"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                     />
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                         onClick={submitOTP}
//                     >
//                         Verify OTP
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "OTP verified successfully!",
        })
        // Redirect or handle success
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Invalid OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">JobBoard</span>
          </Link>
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-muted-foreground">Enter the verification code sent to your device</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter Verification Code</CardTitle>
            <CardDescription>Please enter the 6-digit code we sent to your registered device</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code? <button className="text-primary hover:underline">Resend OTP</button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
