import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function deleteFromS3(key: string) {
  console.log("Bucket:", process.env.AWS_S3_BUCKET, "Key:", key);

  if (!process.env.AWS_S3_BUCKET) {
    throw new Error("AWS_S3_BUCKET is not defined");
  }
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });
  return s3.send(command);
}
