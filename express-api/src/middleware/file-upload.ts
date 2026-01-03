import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary-config";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";

const MIME_TYPE_MAP: { [key: string]: string } = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/svg+xml": "svg",
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_uploads',
    format: async (req: Request, file: Express.Multer.File) => {
      // Cloudinary supports many formats, we can just return undefined to keep original
      // or map correctly.
      const ext = MIME_TYPE_MAP[file.mimetype];
      return ext;
    },
    public_id: (req: Request, file: Express.Multer.File) => uuidv4(),
  } as any,
});

const fileUpload = multer({
  storage: storage,
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

export const uploadBase64Image = async (
  base64Data: string
): Promise<string> => {
  const buffer = Buffer.from(base64Data, "base64");

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "portfolio_uploads",
      },
      (error: any, result: any) => {
        if (error) return reject(error);
        if (result) return resolve(result.secure_url);
        reject(new Error("Upload failed"));
      }
    );
    uploadStream.end(buffer);
  });
};

