import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // One query to get count grouped by status
    const grouped = await prisma.job.groupBy({
      by: ['status'],
      _count: { _all: true },
    });

    const totalJobs = await prisma.job.count();

    // Another query for jobs created in the last 24h
    // const newJobPosted = await prisma.job.count({
    //   where: {
    //     createdAt: {
    //       gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // last 24 hours
    //     },
    //   },
    // });

    // Restructure grouped counts into key-value
    const statusMap: Record<string, number> = {};
    for (const g of grouped) {
      statusMap[g.status] = g._count._all;
    }

    const stats = {
      totalJobs,
      publishedJobs: statusMap["published"] || 0,
      draftJobs: statusMap["draft"] || 0,
      postArchived: statusMap["archived"] || 0,
      // newJobPosted,
    };

    return NextResponse.json(stats, { status: 200 });

  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
