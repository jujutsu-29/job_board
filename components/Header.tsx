"use client";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Briefcase, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const navLinks = [
  { href: "/jobs", label: "Jobs" },
  { href: "/companies", label: "Company" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* <Briefcase className="h-8 w-8 text-primary" />
           */}
          <Link href="/" className="flex">
            <Image
              src="/rolespot_noBG.png"
              alt="Rolespot Logo"
              width={32}
              height={32}
              className="h-8 w-8 text-primary"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-red-500 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
              Rolespot
            </h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`uppercase text-sm transition-colors ${
                pathname === link.href
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth & WhatsApp */}
        <div className="flex items-center">
          <a
            href="https://whatsapp.com/channel/0029Vb6750r1noyyzhldq91G"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-red-400 to-blue-600 text-white hover:scale-105 transition">
              <Briefcase className="h-5 w-5" />
              <span>Join WhatsApp</span>
            </Button>
          </a>
          <div className="hidden lg:flex items-center space-x-2">

          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <img
                src={session?.user?.image || ""}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
                />
              <span className="text-sm text-muted-foreground">
                {session?.user?.name}
              </span>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
                >
                Logout
              </Button>
            </div>
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
          {/* Theme toggle small */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle Theme"
            >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
            

      {/* Styles */}
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
        .animate-slide-in {
          animation: slide-in 0.3s ease;
        }
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}
