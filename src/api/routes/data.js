import { Router } from "express";
import { getAllData } from "../controllers/data/index.js";

const router = Router();
router.get("/", getAllData);
// router.get('/names-of-companies', )
export default router;
