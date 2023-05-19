import { User } from "../../../../models/index.js";
import { validateRegister } from "../../../validators/user.validator.js";
import {
  errorHelper,
  generateRandomCode,
  sendCodeToEmail,
  logger,
  getText,
  turkishToEnglish,
  signConfirmCodeToken,
} from "../../../../utils/index.js";
import ipHelper from "../../../../utils/helpers/ip-helper.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import geoip from "geoip-lite";
import { failure, success } from "../../../../utils/helpers/responses.js";
import {
  CONFLICT_ERROR,
  CREATED_SUCCESS,
  INPUT_ERROR,
  UNKNOWN_SERVER_ERROR,
} from "../../../../config/index.js";
import { createAccessToken } from "../../../../utils/helpers/jwt-token-helper.js";

export default async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      let code = "00025";

      return failure(req, res, INPUT_ERROR, code, error.details[0].message, {
        request: { ...req.body },
      });
    }

    const exists = await User.exists({ username: req.body.username });

    if (exists) return failure(req, res, CONFLICT_ERROR, "00032");

    const hashed = await hash(req.body.password, 10);

    let user = new User({
      username: req.body.username,
      password: hashed,
      name: req.body.name,
      platform: req.body.platform,
      type: "admin",
      gender: req.body.gender,
    });

    user = await user.save();

    user.password = null;

    const accessToken = createAccessToken(user._id, {
      username: req.body.username,
      name: req.body.name,
      type: req.body.type,
    });

    return success(req, res, CREATED_SUCCESS, "00035", undefined, undefined, {
      accessToken,
    });
  } catch (err) {
    return failure(req, res, UNKNOWN_SERVER_ERROR, "00008", err.message);
  }
};
