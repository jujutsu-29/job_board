"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/verify-otp", {
        email: email,
        otp,
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "OTP verified successfully!",
        });
        router.push("/login");
      } else {
        const error = (await response.data.error) || new Error("Invalid OTP");
        toast({
          title: "Error",
          description: error.message || "Invalid OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-background overflow-hidden">
      {/* Animated blue-red glassy background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-red-400/20 blur-3xl opacity-80 animate-otp-bg" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-red-500/20 via-blue-400/10 to-blue-500/20 blur-2xl opacity-70 animate-otp-bg-rev" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-red-400/20 to-blue-500/10 blur-3xl opacity-60 animate-otp-bg" />
      </div>
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
              JobBoard
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            Verify OTP
          </h1>
          <p className="text-muted-foreground">
            Enter the verification code sent to your device
          </p>
        </div>

        <Card className="rounded-2xl shadow-xl border-0 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md animate-fade-in-up">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
              Enter Verification Code
            </CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to your registered device
            </CardDescription>
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
                  className="text-center text-lg tracking-widest focus:ring-2 focus:ring-blue-400 dark:focus:ring-red-700 transition"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-red-400 to-blue-600 text-white font-bold shadow-lg hover:from-blue-600 hover:to-red-500 transition-all duration-300 border-2 border-transparent hover:border-blue-400 animate-otp-btn"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                <button
                  className="text-primary hover:underline"
                  type="button"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to login
          </Link>
        </div>
      </div>
      <style jsx>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 6s ease-in-out infinite alternate;
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animate-otp-bg {
          animation: otp-bg-move 12s ease-in-out infinite alternate;
        }
        .animate-otp-bg-rev {
          animation: otp-bg-move-rev 14s ease-in-out infinite alternate;
        }
        @keyframes otp-bg-move {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(20px) scale(1.08);
          }
        }
        @keyframes otp-bg-move-rev {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .animate-otp-btn {
          animation: otp-btn-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite
            alternate;
        }
        @keyframes otp-btn-glow {
          0% {
            box-shadow: 0 4px 24px 0 rgba(59, 130, 246, 0.16),
              0 1.5px 6px 0 rgba(239, 68, 68, 0.1);
          }
          100% {
            box-shadow: 0 8px 32px 0 rgba(239, 68, 68, 0.18),
              0 2px 8px 0 rgba(59, 130, 246, 0.12);
          }
        }
      `}</style>
    </div>
  );
}
