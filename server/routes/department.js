import express from "express"
import { addDepartment, updateDepartment, getDepartment, getDepartmentsingle,deleteDepartment } from "../controller/departmentController.js"
import verifyUser from "../middleware/authMiddleware.js"

const router = express.Router()
router.get("/",verifyUser,getDepartment)
router.post("/add",verifyUser,addDepartment)
router.get("/:id",verifyUser,getDepartmentsingle)
router.put("/:id",verifyUser,updateDepartment)
router.delete("/:id",verifyUser,deleteDepartment)

export default router;