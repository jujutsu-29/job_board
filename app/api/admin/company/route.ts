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

    const companies = await prisma.company.findMany({});

    return NextResponse.json(companies);
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
    const { name, website, description, companyType, tags } = body;

    // if (!title || !companyName || !description || !applyUrl) {
    //   return NextResponse.json(
    //     { error: "Missing required fields" },
    //     { status: 400 }
    //   );
    // }

    const slug = slugify(name, { lower: true, strict: true });

    const existingCompany = await prisma.company.findFirst({
      where: { name: name },
    });

    if (existingCompany) {
      const updatedCompany = await prisma.company.update({
        where: { id: existingCompany.id },
        data: {
          name,
          website,
          description,
          companyType,
          tags,
          slug: slug || existingCompany.slug,
        },
      });
      return NextResponse.json(
        { updatedCompany, message: "Company updated successfully" },
        { status: 201 }
      );
    }
    const company = await prisma.company.create({
      data: {
        name,
        website,
        description,
        companyType,
        tags,
        slug
      },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
