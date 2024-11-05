import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
const maxSize = 512 * 1024; // 512 KB

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
  }
  cb(null, true);
};

// Set up multer for single image upload
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single("image");
