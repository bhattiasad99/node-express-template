import mongooseLoader from "./mongoose.js";
import expressLoader from "./express.js";
import { ENABLE_MONGODB_CONNECTION } from "../config/index.js";

export default async (app) => {
  if (ENABLE_MONGODB_CONNECTION) {
    await mongooseLoader();
  }
  expressLoader(app);
};
