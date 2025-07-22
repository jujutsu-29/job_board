"use server"

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function registerUser(data: {
  email: string
  password: string
  firstName: string
  lastName: string
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await prisma.user.create({
    data: {
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      password: hashedPassword,
    },
  })
}
