import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import slugify from "slugify";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // console.log("Params:", params);
    const slug = (await params).slug;
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
    // console.log("Fetched company:", company);

    return NextResponse.json({ company }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const slug = (await params).slug;
    const body = await request.json();
    // console.log("Updating company with slug:", slug, "and body:", body);
    const updatedCompany = await prisma.company.update({
      where: { slug: slug },
      data: {
        name: body.name,
        website: body.website,
        description: body.description,
        companyType: body.companyType,
        tags: body.tags,
      },
    });

    return NextResponse.json({ company: updatedCompany }, { status: 201 });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
