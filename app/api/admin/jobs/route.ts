import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import slugify from "slugify";
export async function GET(request: NextRequest) {
  try {
    // const session = await auth();

    // if (!session || session.user?.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const jobs = await prisma.job.findMany({
      include: {
        company: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const {
      title,
      companyName,
      location,
      description,
      applyUrl,
      status,
      isFeatured,
      expiresAt,
    } = body;

    if (!title || !companyName || !location || !description || !applyUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = slugify(title, { lower: true, strict: true })

    const existingCompany = await prisma.company.findFirst({
      where: { name: companyName },
    });

    const newCompany = existingCompany || await prisma.company.create({
        data: {
          name: companyName,
        },
      });
    

    const job = await prisma.job.create({
      data: {
        title,
        company: { connect: { id: newCompany.id } },
        location,
        description,
        applyUrl, 
        slug,
        status,
        isFeatured,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        postedAt: status === "published" ? new Date() : null,
        source: "manual",
        createdById: session.user.id,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
