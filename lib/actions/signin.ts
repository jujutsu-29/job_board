"use server"

import { signIn } from "@/lib/auth"

export async function signInWithGoogle() {
  await signIn("google",  { redirectTo: "/jobs" });
}

export async function signInWithCredentials(email: string, password: string) {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
}
