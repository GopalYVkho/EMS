import express from "express"
import verifyUser from "../middleware/authMiddleware.js"
import { addEmployee,upload,getEmployee,getEmployeesingle,updateEmployee,deleteEmployee,fetchEmployeeById } from "../controller/employeeController.js";


const router = express.Router()
router.get("/",verifyUser,getEmployee)
router.post("/add",verifyUser,upload.single('image'),addEmployee)
router.get("/:id",verifyUser,getEmployeesingle)
router.put("/:id",verifyUser,upload.single('image'),updateEmployee)
router.delete("/:id",verifyUser,deleteEmployee)
router.get("/department/:id",verifyUser,fetchEmployeeById)

export default router;