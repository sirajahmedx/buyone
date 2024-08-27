// Route: /api/aws/get-presigned-url
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
   credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
   },
   region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export async function POST(request) {
   try {
      const { fileName, fileType } = await request.json();

      const command = new PutObjectCommand({
         Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
         Key: fileName,
         ContentType: fileType,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 });

      return NextResponse.json({ url });
   } catch (error) {
      console.error("Failed to generate pre-signed URL:", error);
      return NextResponse.json(
         { error: "Failed to generate pre-signed URL" },
         { status: 500 }
      );
   }
}
