// API REQUEST
export default async (req, res) => {
  try {
    // VALIDATION
    // const { error } = validateRegister(req.body);
    // if (error) {
    //   return failure(req, res, INPUT_ERROR, "00095", error.details[0].message, {
    //     provided: { ...req.body },
    //   });
    // }

    return success(req, res, OK_SUCCESS, "00094");
  } catch (err) {
    return failure(req, res, UNKNOWN_SERVER_ERROR, "00008", err.message);
  }
};
