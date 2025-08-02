"use client";
import Link from "next/link";
import {
  Home,
  Briefcase,
  Building2,
  MoreHorizontal,
  Sun,
  Moon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";

export function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const tabs = [
    { href: "/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/companies", icon: Building2, label: "Companies" },
    { href: "/about", icon: Home, label: "About" },
  ];
  const { theme, setTheme } = useTheme();

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 bg-background border-t border-muted shadow-sm flex justify-around py-2 lg:hidden z-50">

        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Button
  key={tab.href}
  variant="ghost"
  onClick={() => router.push(tab.href)}
  className={`flex flex-col items-center gap-1 ${
    active ? "text-primary font-semibold" : "text-muted-foreground"
  }`}
>
  <Icon className="w-6 h-6" />
  <span className="text-[11px]">{tab.label}</span>


              {/* <Icon
                className={`h-6 w-6 ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs ${
                  active
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              > */}
                {/* {tab.label} */}
              {/* </span> */}
            </Button>
          );
        })}

        {/* More sheet trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1"
            >
              <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-4/5 max-w-xs bg-background flex flex-col">
  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b">
    <h2 className="text-lg font-semibold text-foreground">More</h2>
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  </div>

  {/* Content */}
  <div className="px-5 py-4 space-y-6">
    {/* WhatsApp CTA */}
    <a
      href="https://whatsapp.com/channel/0029Vb6750r1noyyzhldq91G"
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Button
        className="w-full justify-center bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white hover:opacity-90"
      >
        <Briefcase className="w-5 h-5 mr-2" />
        Join WhatsApp
      </Button>
    </a>

    {/* Auth Section */}
    {isLoggedIn ? (
      <div className="flex items-center gap-3">
        <img
          src={session?.user?.image || ""}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{session?.user?.name}</p>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 text-red-500 hover:underline"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </div>
      </div>
    ) : (
      <div className="space-y-4 mb-4">
        <Link href="/login">
          <Button variant="outline" className="w-full">Login</Button>
        </Link>
        <Link href="/signup">
          <Button className="w-full">Sign Up</Button>
        </Link>
      </div>
    )}
  </div>
</SheetContent>

        </Sheet>
      </nav>

      {/* throw some padding under content so it doesn’t get cut off */}
      <div className="h-[56px] lg:hidden" />
    </>
  );
}
