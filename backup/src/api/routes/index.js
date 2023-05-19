import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { OK_SUCCESS, specs, swaggerConfig } from "../../config/index.js";
import user from "./user.js";
import data from "./data.js";
import { failure, success } from "../../utils/helpers/responses.js";
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.get("/", async (req, res) => {
  try {
    return success(req, res, OK_SUCCESS, "00094");
  } catch (err) {
    return failure(req, res, UNKNOWN_SERVER_ERROR, "00008", err.message);
  }
});

router.use("/user", user);
router.use("/data", data);

export default router;
