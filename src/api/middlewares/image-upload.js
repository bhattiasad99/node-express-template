import chalk from "chalk";
import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
const fileFilter = (_req, file, cb) => {
  try {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/svg+xml"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Please choose a valid image file."), false);
    }
  } catch (err) {
    console.error(chalk.bgRed(err.message));
  }
};

export default multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
}).single("image");
