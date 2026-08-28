import express from "express"
import verifyUser from "../middleware/authMiddleware.js"
import { addLeave } from "../controller/leaveController.js";

const router = express.Router();
router.post('/add',verifyUser,addLeave)


export default router