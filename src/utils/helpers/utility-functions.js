import { ServerResponse } from "http";

function checkAllElementsInArray(arr, validArr) {
  for (let i = 0; i < arr.length; i++) {
    if (!validArr.includes(arr[i])) {
      return false;
    }
  }
  return true;
}

function isServerResponse(obj) {
  return obj instanceof ServerResponse;
}

function removePasswordFromUser({ password, ...userWithoutPassword }) {
  return { ...userWithoutPassword };
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isArray(input) {
  return Array.isArray(input);
}

function removeKeyFromObj(obj, key) {
  delete obj[key];
  return obj;
}

export const ISO_STRING_REGEX_VALIDATION = new RegExp(
  "^(-?(?:[1-9]d{0,3}|0d{3})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12]d)|(?!0000)[0-9]{4})T(2[0-3]|[01]d):([0-5]d):([0-5]d)(.d{1,3})?Z?$"
);

function isIsoString(str) {
  return ISO_STRING_REGEX_VALIDATION.test(str);
}

function getTimeForIsoString(str) {
  const timeVal = str.slice(11, 16);
  return timeVal;
}

function getDateFromIsoString(str) {
  const dateVal = str.slice(0, 10).split("-").reverse().join("-");
  return dateVal;
}

function getLastElementOfArray(arr) {
  return arr[arr.length - 1];
}

export {
  isArray,
  isObject,
  isServerResponse,
  removePasswordFromUser,
  checkAllElementsInArray,
  removeKeyFromObj,
  isIsoString,
  getTimeForIsoString,
  getDateFromIsoString,
  getLastElementOfArray,
};
