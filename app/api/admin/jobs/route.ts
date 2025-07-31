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
      description,
      applyUrl,
      status,
      isFeatured,
      source,
      postedAt,
      expiresAt,
      createdById = session.user.id,
      jobType,
      salary,
      experience,
      requirements,
      basicQualifications,
      keyResponsibilities,
      technicalSkills,
      locationsAvailable,
      tags,
    } = body;

    // if (!title || !companyName || !description || !applyUrl) {
    //   return NextResponse.json(
    //     { error: "Missing required fields" },
    //     { status: 400 }
    //   );
    // }

    const slug = slugify(title, { lower: true, strict: true });

    const existingCompany = await prisma.company.findFirst({
      where: { name: companyName },
    });

    const newCompany =
      existingCompany ||
      (await prisma.company.create({
        data: {
          name: companyName,
        },
      }));

    const job = await prisma.job.create({
      data: {
        title,
        company: { connect: { id: newCompany.id } },
        description,
        applyUrl,
        status,
        isFeatured,
        source: source,
        createdById: session.user.id,
        jobType,
        salary,
        experience,
        requirements,
        basicQualifications,
        keyResponsibilities,
        technicalSkills,
        locationsAvailable,
        tags,
        slug,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        postedAt: status === "published" ? new Date() : null,
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
