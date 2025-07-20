"use client";

import { Briefcase, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">JobBoard</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/jobs"
              className={`transition-colors ${
                pathname === "/jobs"
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Jobs
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                pathname === "/about"
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              About
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <img
                  src={session?.user?.image ?? ""}
                  alt="user"
                  className="w-8 h-8 rounded-full hidden md:block"
                />
                <span className="text-sm text-muted-foreground hidden md:inline">
                  {session?.user?.email}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
