import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // const validOtp = await prisma.otp.findFirst({
  //   where: {
  //     userId: user.id,
  //     code: otp,
  //     expiresAt: { gt: new Date() },
  //   },
  // });
  const validOtp = await prisma.otp.findUnique({ where: { userId: user.id } });

  if (!validOtp || validOtp.code !== otp || validOtp.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() },
  });

  await prisma.otp.delete({ where: { userId: user.id } });

  return NextResponse.json({ success: true });
}
