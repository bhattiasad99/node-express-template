import {
  S3Client,
  AbortMultipartUploadCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import {
  bucketName,
  awsRegion,
  awsS3SecretAccessKey,
  awsS3SecretAccessPassword,
} from "../config/index.js";
// https://www.youtube.com/watch?v=vVBqEYNXxy8
export default async (base64, userId) => {
  const s3 = new S3Client({
    region: awsRegion,
    credentials: {
      accessKeyId: awsS3SecretAccessKey,
      secretAccessKey: awsS3SecretAccessPassword,
    },
  });
  const key = `${userId}/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: base64,
  });

  try {
    await s3.send(command);
    return {
      error: false,
      payload: { key },
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};
