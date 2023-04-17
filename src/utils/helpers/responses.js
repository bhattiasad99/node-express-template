import { errorHelper, getText } from "./../index.js";
import { createAccessToken } from "./jwt-token-helper.js";

const buildTime = (initialTimeStamp) => {
  const currentTime = Date.now();
  return currentTime - initialTimeStamp;
};

export function success(
  req,
  res,
  statusCode,
  code,
  message,
  encodedData,
  otherData
) {
  const { initialTimeStamp } = req;
  const timeTakenForAPI = buildTime(initialTimeStamp);
  let encodedResult;
  if (req.user) {
    encodedResult = createAccessToken(req.user._id, encodedData);
  }
  return res.status(statusCode).json({
    timeTakenForAPI,
    resultMessage: { en: getText("en", code), tr: getText("tr", code) },
    resultCode: code,
    error: false,
    message: message ? message : getText("en", code),
    otherMessage: message ? message : getText("en", code),
    encoded: encodedData ? encodedResult : null,
    statusCode,
    ...otherData,
  });
}

export function failure(req, res, statusCode, code, message, otherData) {
  const { initialTimeStamp } = req;
  const timeTakenForAPI = buildTime(initialTimeStamp);
  return res.status(statusCode).json({
    timeTakenForAPI,
    error: true,
    ...errorHelper(code, req, message),
    otherMessage: message ? message : getText("en", code),
    ...otherData,
    statusCode,
  });
}
