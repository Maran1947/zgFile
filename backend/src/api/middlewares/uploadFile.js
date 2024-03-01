import multer from "multer";
import fs from "fs";
import { imageMimeTypes } from "../../helpers/imageMimeTypes.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { userId } = req.user;
    const dir = `./uploads/${userId}`;
    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    const newFileName = `${Date.now()}-${file.originalname}`;
    cb(null, newFileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 mb
  },
});

const uploadFiles = (req, res, next) => {
  upload.array("images", 10)(req, res, (err) => {
    if (err) {
      const errorMessage =
        err.code === "LIMIT_UNEXPECTED_FILE"
          ? "You can upload atmost 10 images at a time."
          : err.message;

      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const files = req.files;
    const errors = [];

    files.forEach((file) => {
      // const allowedTypes = imageMimeTypes;
      const maxSize = 60 * 1024 * 1024; // 100 mb

      // if (!allowedTypes.includes(file.mimetype)) {
      //   errors.push(`Invalid file type: ${file.originalname}`);
      // }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    req.files = files;
    next();
  });
};

export default uploadFiles;
