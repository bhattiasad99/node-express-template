import mongoose from "mongoose";

import { ENABLE_MONGODB_CONNECTION, dbUri } from "../config/index.js";

export default async () => {
  if (ENABLE_MONGODB_CONNECTION) {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(dbUri, {})
      .then(() => {
        console.log("Mongodb Connection");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
