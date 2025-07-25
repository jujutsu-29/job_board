import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const user = await prisma.user.findUnique({ where: { email }, include: { otp: true } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const validOtp = await prisma.otp.findFirst({
    where: {
      userId: user.id,
      code: otp,
      expiresAt: { gt: new Date() },
    },
  });

  if (!validOtp) return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() },
  });

  await prisma.otp.deleteMany({ where: { userId: user.id } });

  return NextResponse.json({ success: true });
}
