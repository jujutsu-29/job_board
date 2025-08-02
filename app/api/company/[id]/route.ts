import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import slugify from "slugify";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const slug = (await params).id.toLowerCase();
    // console.log("Fetching company with slug:", slug);
    const company = await prisma.company.findUnique({
      where: { slug: slug },
      include: {
        jobs: {
          select: {
            title: true,
            description: true,
            postedAt: true,
            slug: true,
            jobType: true,
          },
        },
      },
    });

    return NextResponse.json({ company }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
