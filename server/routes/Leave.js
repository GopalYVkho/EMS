import express from "express"
import verifyUser from "../middleware/authMiddleware.js"
import { addLeave,LeaveIndex } from "../controller/leaveController.js";

const router = express.Router();
router.post('/add',verifyUser,addLeave)
router.get("/:id",verifyUser,LeaveIndex)


export default router