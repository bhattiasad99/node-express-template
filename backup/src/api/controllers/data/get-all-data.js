import { OK_SUCCESS, UNKNOWN_SERVER_ERROR } from "./../../../config/index.js";
import { failure, success } from "../../../utils/helpers/responses.js";

export default async (req, res) => {
  try {
    return success(req, res, OK_SUCCESS, "00094", "GETTING ALL DATA");
  } catch (err) {
    return failure(req, res, UNKNOWN_SERVER_ERROR, "00008", err.message);
  }
};
