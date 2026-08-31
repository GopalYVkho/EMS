import express from "express"
import verifyUser from "../middleware/authMiddleware.js";
import { adminDashboard } from "../controller/dashboardController.js";

const router = express.Router();
router.get("/",verifyUser,adminDashboard)

export default router;