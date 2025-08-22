// lib/s3.ts (server only)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// simple helper if you want server-side upload
export async function uploadToS3Server(file: Buffer, fileName: string, mimeType: string) {
  // console.log("Uploading to S3 server with fileName:", fileName, "and mimeType:", mimeType);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: `uploads/${Date.now()}_${fileName}`,
    Body: file,
    ContentType: mimeType,
  });

  await s3.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
}
