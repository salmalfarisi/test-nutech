import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

// ensure folder exists
const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// filter config
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format Image tidak sesuai"));
  }
};

// multer instance
const multerUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

// exported middleware
export const uploadImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const singleUpload = multerUpload.single("profile_image");

  singleUpload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // file too large etc
      return res.status(400).json({
        success: false,
        message:
          err.code === "LIMIT_FILE_SIZE"
            ? "Maximum file size is 2MB"
            : err.message,
      });
    }

    if (err) {
      // custom file filter error
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next();
  });
};