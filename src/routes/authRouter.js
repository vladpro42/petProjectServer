import { Router } from "express";
import authController from "../controllers/authController.js";

const router = new Router();

//router.post("/registration", authController.registration)
router.post("/login", authController.login)
export { router as authRouter }