"use client";

import type React from "react";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions/signup";
import axios from "axios";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      setIsLoading(false);
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (!/^[a-zA-Z]+$/.test(formData.firstName) || !/^[a-zA-Z]+$/.test(formData.lastName)) {
      alert("First and last names can only contain letters");
      setIsLoading(false);
      return;
    }

    try {
      await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // await axios.post("/api/auth/send-otp", { email: formData.email });
      alert("Account created successfully! Redirecting...");
      // router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      router.push("login");
    } catch (err : any) {
      alert(err.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-background overflow-hidden">
      {/* Animated blue-red glassy background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
      >
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-red-400/20 blur-3xl opacity-80 animate-signup-bg" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-red-500/20 via-blue-400/10 to-blue-500/20 blur-2xl opacity-70 animate-signup-bg-rev" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-red-400/20 to-blue-500/10 blur-3xl opacity-60 animate-signup-bg" />
      </div>
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
              Rolespot
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Create your account</h1>
          <p className="text-muted-foreground">
            Join thousands of job seekers today
          </p>
        </div>

        <Card className="rounded-2xl shadow-xl border-0 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md animate-fade-in-up">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
              Sign Up
            </CardTitle>
            <CardDescription>
              Fill in your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                    className="focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                    className="focus:ring-2 focus:ring-red-400 dark:focus:ring-red-700 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    className="focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 transition"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    required
                    className="focus:ring-2 focus:ring-red-400 dark:focus:ring-red-700 transition"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked as boolean)
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-red-400 to-blue-600 text-white font-bold shadow-lg hover:from-blue-600 hover:to-red-500 transition-all duration-300 border-2 border-transparent hover:border-blue-400 animate-signup-btn"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </div>
      <style jsx>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 6s ease-in-out infinite alternate;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-signup-bg {
          animation: signup-bg-move 12s ease-in-out infinite alternate;
        }
        .animate-signup-bg-rev {
          animation: signup-bg-move-rev 14s ease-in-out infinite alternate;
        }
        @keyframes signup-bg-move {
          0%,100% { transform: translateY(0) scale(1);}
          50% { transform: translateY(20px) scale(1.08);}
        }
        @keyframes signup-bg-move-rev {
          0%,100% { transform: translateY(0) scale(1);}
          50% { transform: translateY(-20px) scale(1.05);}
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
        .animate-signup-btn {
          animation: signup-btn-glow 2.5s cubic-bezier(0.4,0,0.6,1) infinite alternate;
        }
        @keyframes signup-btn-glow {
          0% { box-shadow: 0 4px 24px 0 rgba(59,130,246,0.16), 0 1.5px 6px 0 rgba(239,68,68,0.10);}
          100% { box-shadow: 0 8px 32px 0 rgba(239,68,68,0.18), 0 2px 8px 0 rgba(59,130,246,0.12);}
        }
      `}</style>
    </div>
  );
}
