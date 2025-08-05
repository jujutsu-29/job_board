import { getAllJobs } from "@/lib/actions/jobs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const jobs = await getAllJobs();
    const { pathname } = request.nextUrl;
    
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
        // console.log("Token in GET /jobs:", token);
        // console.log("Pathname is this ", pathname)
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
