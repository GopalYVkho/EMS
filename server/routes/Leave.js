import express from "express"
import verifyUser from "../middleware/authMiddleware.js"
import { addLeave,LeaveIndex,LeaveIndexAdmin,LeaveDetails,LeaveApprove } from "../controller/leaveController.js";

const router = express.Router();
router.post('/add',verifyUser,addLeave)
router.get("/:id",verifyUser,LeaveIndex)
router.put("/:id",verifyUser,LeaveApprove)
router.get("/",verifyUser,LeaveIndexAdmin)
router.get("/detail/:id",verifyUser,LeaveDetails)



export default router