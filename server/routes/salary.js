import express from "express"
import verifyUser from "../middleware/authMiddleware.js"
import { addSalary,salaryHistory } from "../controller/salaryController.js";


const router = express.Router()
router.post("/add",verifyUser,addSalary)
router.get("/:id",verifyUser,salaryHistory)

export default router;