import { type NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"

export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession()

    // if (!session || session.user?.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    // In a real app, use Prisma to get actual stats:
    // const totalJobs = await prisma.job.count()
    // const publishedJobs = await prisma.job.count({ where: { status: 'published' } })
    // const draftJobs = await prisma.job.count({ where: { status: 'draft' } })

    const mockStats = {
      totalJobs: 25,
      publishedJobs: 18,
      draftJobs: 7,
      totalApplications: 142,
    }

    return NextResponse.json(mockStats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
