import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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
       async authorize(creds) {
        if (!creds?.email || !creds.password) {
          throw new InvalidLoginError("Missing email or password");
        }

        const user = await prisma.user.findUnique({ where: { email: String(creds.email) } });
        if (!user || !user.password) {
          throw new InvalidLoginError("No user found");
        }

        const isValid = await bcrypt.compare(String(creds.password), String(user.password));
        if (!isValid) {
          throw new InvalidLoginError("Invalid email or password");
        }

        if (!user.emailVerified) {
          throw new InvalidLoginError("Please verify your email before logging in");
          // throw new Error("Please verify your email before logging in");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});


class InvalidLoginError extends CredentialsSignin {
  code = "custom";
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}