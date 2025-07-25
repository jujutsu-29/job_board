import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateOTP, getOtpExpiry } from "@/lib/otp";
import { sendOtpMail } from "@/lib/mail";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const code = generateOTP();
  const expiresAt = getOtpExpiry();

  await prisma.otp.create({
    data: {
      code,
      expiresAt,
      userId: user.id,
    },
  });

  await sendOtpMail(email, code);

  return NextResponse.json({ success: true });
}
