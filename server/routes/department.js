import express from "express"
import { addDepartment } from "../controller/departmentController"
import verifyUser from "../middleware/authMiddleware"

const router = express.Router()
router.post("/add",verifyUser,addDepartment)

export default router;