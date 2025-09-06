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
import SignIn from "@/components/sign-in";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Loading } from "@/components/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        alert("Please enter both email and password");
        setIsLoading(false);
        return;
      }
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/jobs"
      }) as any;

      if (result?.error) {
        alert(`${result.code}`);
        setIsLoading(false);
        return;
      }
      router.refresh();
      router.push("/jobs");
    } catch (error) {
      alert(`error logging in: ${error}`);
      setIsLoading(false);
      return;
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
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-red-400/20 blur-3xl opacity-80 animate-login-bg" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-red-500/20 via-blue-400/10 to-blue-500/20 blur-2xl opacity-70 animate-login-bg-rev" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 via-red-400/20 to-blue-500/10 blur-3xl opacity-60 animate-login-bg" />
      </div>
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            {/* <Briefcase className="h-8 w-8 text-primary" /> */}
            <Image
              src="/rolespot_noBG.png"
              alt="Rolespot Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
              Rolespot
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="rounded-2xl shadow-xl border-0 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md animate-fade-in-up">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
              Sign In
            </CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-red-400 dark:focus:ring-red-700 transition"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-red-400 to-blue-600 text-white font-bold shadow-lg hover:from-blue-600 hover:to-red-500 transition-all duration-300 border-2 border-transparent hover:border-blue-400 animate-login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <Button
              type="button"
              className="w-full mt-4 bg-gradient-to-r from-red-500 via-blue-400 to-blue-600 text-white font-bold shadow-md hover:from-red-600 hover:to-blue-700 transition-all duration-300 border-2 border-transparent hover:border-red-400"
              disabled={isLoading}
              onClick={() => SignIn()}
            >
              {isLoading ? <Loading /> : <SignIn />}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
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
        .animate-login-bg {
          animation: login-bg-move 12s ease-in-out infinite alternate;
        }
        .animate-login-bg-rev {
          animation: login-bg-move-rev 14s ease-in-out infinite alternate;
        }
        @keyframes login-bg-move {
          0%,100% { transform: translateY(0) scale(1);}
          50% { transform: translateY(20px) scale(1.08);}
        }
        @keyframes login-bg-move-rev {
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
        .animate-login-btn {
          animation: login-btn-glow 2.5s cubic-bezier(0.4,0,0.6,1) infinite alternate;
        }
        @keyframes login-btn-glow {
          0% { box-shadow: 0 4px 24px 0 rgba(59,130,246,0.16), 0 1.5px 6px 0 rgba(239,68,68,0.10);}
          100% { box-shadow: 0 8px 32px 0 rgba(239,68,68,0.18), 0 2px 8px 0 rgba(59,130,246,0.12);}
        }
      `}</style>
    </div>
  );
}
