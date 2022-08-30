import { Request, RequestHandler } from "express";
import multer from "multer";
import sharp from "sharp";
import { uniqueId, get } from "lodash";

import { ImageUploadError } from "errors/customErrors";
import { asyncCatchErr } from "utils/asyncCatchErr";

const supportedImageType = {
  jpg: "jpg",
  jpeg: "jpeg",
  png: "png",
  gif: "gif",
};

type supportedImageType = keyof typeof supportedImageType;

const multerStorage = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.IMAGE_TEMP || "");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});

export const uploadPostImage = upload.single("image");

export const resizePostImage: RequestHandler = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) throw new ImageUploadError();
    const fileType = (get(file, "mimetype") || "").split("/")[1];
    if (Object.keys(supportedImageType).indexOf(fileType) === -1)
      throw new ImageUploadError("File type is not supported");

    const fileName = `post-${uniqueId()}-${Date.now()}.${fileType}`;
    await sharp(req.file?.buffer)
      .resize(800, 450)
      .toFormat(fileType as supportedImageType)
      .jpeg({ quality: 90 })
      .toFile(`public/images/${fileName}`);

    req.body.image = JSON.stringify(fileName);

    next();
  } catch (err) {
    next(err);
  }
};

export const parsePostFormData = asyncCatchErr((req, res, next) => {
  if (req.file) {
    const tempFile = {
      tempFilePath: process.env.IMAGE_TEMP + "/" + req.file.originalname,
      newFileExtension: req.file.originalname.substring(
        req.file.originalname.lastIndexOf(".") + 1
      ),
      newFilePath: "",
      previousFilePath: "",
    };
    req.tempFile = tempFile;
  } else req.tempFile = {};
  if (!req.body) return next();
  const parsedData = Object.entries(req.body).reduce((prev, [key, value]) => {
    prev[key] = JSON.parse(value as string);
    return prev;
  }, {} as { [key: string]: any });
  req.body = parsedData;
  next();
});

export const handleUpdateFileSuccess = asyncCatchErr((req, res, next) => {
  if (res.response && res.response.success) res.status(200).send(res.response);
  else next();
});
