import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string
      role: "user" | "admin"
    }
  }

  interface User extends DefaultUser {
    id: string
    role: "user" | "admin"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "user" | "admin"
  }
}
