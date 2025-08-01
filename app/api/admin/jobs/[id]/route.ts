import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"
// import getServerSession from "next-auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    // In a real app, use Prisma:
    // const job = await prisma.job.update({
    //   where: { id: params.id },
    //   data: {
    //     status,
    //     postedAt: status === 'published' ? new Date() : null
    //   }
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, use Prisma:
    // await prisma.job.delete({
    //   where: { id: params.id }
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting job:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const slug = (await params).id
    const job = await prisma.job.findUnique({
      where: { slug: slug },
      include: {
        company: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json({ job }, { status: 200 })
  } catch (error) {
    console.error("Error fetching job:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}