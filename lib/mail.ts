import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpMail(to: string, otp: string) {
  await transporter.sendMail({
    from: `"JobBoard" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `<p>Your OTP is: <b>${otp}</b>. It will expire in 10 minutes.</p>`,
  });
}
