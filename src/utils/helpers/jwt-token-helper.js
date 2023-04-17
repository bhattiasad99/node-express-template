import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import {
  ACCESS_TOKEN_EXPIRATION,
  jwtSecretKey,
  refreshTokenSecretKey,
  REFRESH_TOKEN_EXPIRATION,
} from "../../config/index.js";
import Token from "../../models/token.js";
import { isObject } from "./utility-functions.js";
import chalk from "chalk";

const buildToken = ({ userId, payload }, expiresIn) => {
  if (!(isObject(payload) || !payload)) {
    throw new Error("If payload is defined, it should be an object!");
  }
  const accessToken = sign({ _id: userId, ...payload }, jwtSecretKey, {
    expiresIn,
  });
  return accessToken;
};

export const decodeToken = (token) => {
  return verify(token, jwtSecretKey);
};

export function createAccessToken(userId, payload) {
  const token = buildToken({ userId, payload }, ACCESS_TOKEN_EXPIRATION);
  return token;
}

export function signAccessToken(userId) {
  const accessToken = sign({ _id: userId }, jwtSecretKey, {
    expiresIn: "1h",
  });
  return accessToken;
}
export function signRefreshToken(userId) {
  const refreshToken = sign({ _id: userId }, refreshTokenSecretKey, {
    expiresIn: "7d",
  });
  return refreshToken;
}
export function signConfirmCodeToken(userId, confirmCode) {
  const confirmCodeToken = sign(
    { _id: userId, code: confirmCode },
    jwtSecretKey,
    {
      expiresIn: "5m",
    }
  );
  return confirmCodeToken;
}
