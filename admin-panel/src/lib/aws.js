import {
   CopyObjectCommand,
   DeleteObjectCommand,
   ListObjectsV2Command,
   GetObjectCommand,
   PutObjectCommand,
   S3Client,
   DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Configuration = {
   credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
   },
   region: process.env.NEXT_PUBLIC_AWS_REGION,
};

const s3 = new S3Client(s3Configuration);

async function deleteImage(key) {
   const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: key,
   });
   const response = await s3.send(command);
   return response;
}

async function emptyS3Directory(dir) {
   const listObjectsCommand = new ListObjectsV2Command({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Prefix: dir,
   });

   let listedObjects;
   do {
      listedObjects = await s3.send(listObjectsCommand);

      if (listedObjects?.Contents?.length > 0) {
         const deleteObjectsCommand = new DeleteObjectsCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
            Delete: {
               Objects: listedObjects.Contents.map((object) => ({
                  Key: object.Key,
               })),
            },
         });

         await s3.send(deleteObjectsCommand);
      }
   } while (listedObjects.IsTruncated);
}

async function cloneImage(key, sourceKey) {
   const command = new CopyObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      CopySource: process.env.bucketName + "/" + sourceKey,
      Key: key,
      ACL: "public-read",
   });

   const response = await s3.send(command);
   return response;
}

async function generateGetUrl(key) {
   const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: key,
   });
   const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 });
   return url;
}

async function generatePutUrl(Key, ContentType) {
   const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: Key,
      ContentType: ContentType,
   });
   const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 });
   return url;
}

export {
   cloneImage,
   deleteImage,
   generateGetUrl,
   generatePutUrl,
   emptyS3Directory,
};
