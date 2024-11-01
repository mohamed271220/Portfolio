import multer from "multer";
import multerS3 from "multer-s3";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import s3Client from "../config/aws-config";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

const MIME_TYPE_MAP: { [key: string]: string } = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/svg+xml": "svg", // Added SVG MIME type
};

const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME!,
    key: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: any, key?: string) => void
    ) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${uuidv4()}.${ext}`);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error: Error | null = isValid
      ? null
      : new Error("Invalid mime type!");
    cb(error, isValid);
  },
  limits: { fileSize: 5000000 }, // 5MB
});

export default fileUpload;

export const uploadBase64ImageToS3 = async (
  base64Data: string
): Promise<string> => {
  const buffer = Buffer.from(base64Data, "base64");
  const key = `images/${uuidv4()}.png`; // Generate a unique file name

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: "image/png",
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
};
/**
test file
curl -X POST http://localhost:3000/api/v1/media/upload \
  -H "Content-Type: multipart/form-data" \
  -F "photos=@/path/to/your/image.jpg"

*/
