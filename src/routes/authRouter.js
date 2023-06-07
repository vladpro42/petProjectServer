import { Router } from "express";
import authController from "../controllers/authController.js";
import { body } from "express-validator";
import authMiddlware from "../middleware/authMiddlware.js";

const router = new Router();

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 32 }),
    authController.registration)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/activate/:link", authController.activate)
router.get("/refresh", authController.refresh)
router.get("/something", authMiddlware, authController.getUsers)
router.get("/checkToken/:token", authMiddlware, authController.getUsers)


export { router as authRouter }