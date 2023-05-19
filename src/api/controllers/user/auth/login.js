import { User, Token } from "../../../../models/index.js";
import { validateLogin } from "../../../validators/user.validator.js";
import {
  errorHelper,
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
} from "../../../../utils/index.js";
import bcrypt from "bcryptjs";
const { compare } = bcrypt;
import { removePasswordFromUser } from "./../../../../utils/helpers/utility-functions.js";
import {
  createAccessToken,
  decodeToken,
} from "../../../../utils/helpers/jwt-token-helper.js";
import { failure, success } from "../../../../utils/helpers/responses.js";
import { INPUT_ERROR } from "../../../../config/index.js";

export default async (req, res) => {
  try {
    const { username, password } = req.body;
    const { error } = validateLogin({ username, password });
    if (error) {
      let code = "00038";
      return failure(req, res, INPUT_ERROR, code, error.details[0].message);
    }
    const user = await User.findOne({ username: username }).select("+password");
    // .catch((err) => {
    //   return failure(req, res, 500, "00041", err.message);
    // });

    if (!user) return failure(req, res, 404, "00042");

    // if (!user.isActivated) return failure(req, res, 400, "00043");

    // if (!user.isVerified) return res.status(400).json(errorHelper("00044", req));

    const match = await compare(password, user.password);
    if (!match) return failure(req, res, 400, "00045");
    const userDetails = user._doc;

    const accessToken = createAccessToken(user._id, {
      ...removePasswordFromUser(userDetails),
    });
    // const refreshToken = signRefreshToken(user._id);
    //NOTE: 604800000 ms is equal to 7 days. So, the expiry date of the token is 7 days after.
    // await Token.updateOne(
    //   { userId: user._id },
    //   {
    //     $set: {
    //       refreshToken: refreshToken,
    //       status: true,
    //       expiresIn: Date.now() + 604800000,
    //       createdAt: Date.now(),
    //     },
    //   }
    // ).catch((err) => {
    //   return res.status(500).json(errorHelper("00046", req, err.message));
    // });

    // logger("00047", user._id, getText("en", "00047"), "Info", req);
    return success(req, res, 200, "00047", undefined, undefined, {
      accessToken,
      // refreshToken,
    });
  } catch (err) {
    return failure(req, res, 500, "00008", err.message);
  }
};
