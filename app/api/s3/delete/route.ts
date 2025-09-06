import { NextResponse } from "next/server";
import { deleteFromS3 } from "@/lib/s3";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL required" }, { status: 400 });
    }

    const url = new URL(imageUrl);
    const key = url.pathname.substring(1); // remove leading /

    let response = await deleteFromS3(key);
    console.log("S3 delete response:", response);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting S3 object:", err);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
