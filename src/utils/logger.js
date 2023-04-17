import { ENABLE_MONGODB_CONNECTION } from "../config/index.js";
import { Log } from "../models/index.js";
import ipHelper from "./helpers/ip-helper.js";

export default async (code, userId, errorMessage, level, req) => {
  if (ENABLE_MONGODB_CONNECTION) {
    let ip = "no-ip";
    if (req !== "") ip = ipHelper(req);
    let log = new Log({
      resultCode: code,
      level: level,
      errorMessage: errorMessage,
      ip: ip,
    });

    if (userId !== "" && userId) log.userId = userId;

    await log.save().catch((err) => {
      console.log("Logging is failed: " + err);
    });
  }
};
