import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import slugify from "slugify";
import { createJobWithUniqueSlug } from "@/lib/utils";
import { getAllJobs } from "@/lib/actions/jobs";
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobs = await getAllJobs();

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

    const existingCompany = await prisma.company.findFirst({
      where: { name: companyName },
    });

    const newCompany =
      existingCompany ||
      (await prisma.company.create({
        data: {
          name: companyName,
          slug: slugify(companyName, { lower: true, strict: true }),
          description: "",
          logo: "",
          website: "",
          companyType: "",
        },
      }));

    const job = await createJobWithUniqueSlug(
      {
        title,
        company: { connect: { id: newCompany.id } },
        description,
        applyUrl,
        status,
        isFeatured,
        source,
        createdById,
        jobType,
        salary,
        experience,
        requirements,
        basicQualifications,
        keyResponsibilities,
        technicalSkills,
        locationsAvailable,
        tags,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        postedAt: status === "published" ? new Date() : null,
      },
      title
    );

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;
  // console.log("Received DELETE request for job ID:", body);
  // console.log("Deleting job with ID:", id);
  if (!id) {
    return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
  }

  try {
    const existingJob = await prisma.job.findUnique({

      where: { id },
    });

    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await prisma.job.delete({
      where: { id },
    });
    // console.log("Deleted job:", job);

  return NextResponse.json(
    { message: "Job deleted successfully" },
    { status: 200 }
  );
} catch (error) {
  console.error("Error deleting job:", error);
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const slug = body.slug;
    // console.log("Received PUT request for job ID:", body);
    // console.log("Received PUT request for job ID:", body.slug);
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
      jobType,
      salary,
      experience,
      requirements,
      basicQualifications,
      keyResponsibilities,
      technicalSkills,
      locationsAvailable,
      tags,
    } = body.submitData;

    // Find or create company
    const existingCompany = await prisma.company.findFirst({
      where: { name: companyName },
    });

    let companyId = existingCompany?.id;
    if (!existingCompany) {
      const newCompany = await prisma.company.create({
        data: {
          name: companyName,
          slug: companyName.toLowerCase().replace(/\s+/g, "-"),
          description: "",
          logo: "",
          website: "",
          companyType: "",
        },
      });
      companyId = newCompany.id;
    }

    // Update the job
    const updatedJob = await prisma.job.update({
      where: { slug: slug },
      data: {
        title,
        companyId,
        description,
        applyUrl,
        status,
        isFeatured,
        source,
        jobType,
        salary,
        experience,
        requirements: Array.isArray(requirements) ? requirements : [],
        basicQualifications: Array.isArray(basicQualifications) ? basicQualifications : [],
        keyResponsibilities: Array.isArray(keyResponsibilities) ? keyResponsibilities : [],
        technicalSkills: Array.isArray(technicalSkills) ? technicalSkills : [],
        locationsAvailable: Array.isArray(locationsAvailable) ? locationsAvailable : [],
        tags: Array.isArray(tags) ? tags : [],
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        postedAt: status === "published" && !postedAt ? new Date() : postedAt ? new Date(postedAt) : null,
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}