import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

// Mock data for demonstration - replace with actual Prisma queries
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: { name: "TechCorp Inc." },
    location: "San Francisco, CA",
    status: "published",
    isFeatured: true,
    postedAt: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-15T10:00:00Z",
    slug: "senior-frontend-developer-techcorp",
  },
  {
    id: "2",
    title: "Product Manager",
    company: { name: "StartupXYZ" },
    location: "New York, NY",
    status: "draft",
    isFeatured: false,
    postedAt: null,
    createdAt: "2024-01-14T15:30:00Z",
    slug: "product-manager-startupxyz",
  },
]

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobs = await prisma.job.findMany({
      include: {
        company: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(mockJobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await request.json()
    const { title, companyId, location, description, applyUrl, status, isFeatured, expiresAt } = body

    // Validate required fields
    if (!title || !companyId || !location || !description || !applyUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    
    const job = await prisma.job.create({
      data: {
        title,
        companyId,
        location,
        description,
        applyUrl,
        slug,
        status,
        isFeatured,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        postedAt: status === 'published' ? new Date() : null,
        source: 'manual',
        createdById: session.user.id
      }
    })

    const mockJob = {
      id: Date.now().toString(),
      title,
      companyId,
      location,
      description,
      applyUrl,
      slug,
      status,
      isFeatured,
      expiresAt,
      postedAt: status === "published" ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(mockJob, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
