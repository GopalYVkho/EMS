import express from "express";
import { Login,verify } from "../controller/authController.js";
import verifyUser from "../middleware/authMiddleware.js";

const router =express.Router();
router.post("/login",Login)
router.get("/verify",verifyUser,verify)

export default router;  

