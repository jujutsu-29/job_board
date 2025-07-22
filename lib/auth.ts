import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: typeof credentials?.email === "string" ? credentials.email : undefined },
        })

        if (!user || !user.password) {
          throw new Error("No user found")
        }

        const isValid = await bcrypt.compare(
          typeof credentials.password === "string" ? credentials.password : "",
          typeof user.password === "string" ? user.password : ""
        )

        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login", // optional, handle errors
  },
})
