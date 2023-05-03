import { Router } from "express";
import authController from "../controllers/authController.js";

const router = new Router();

router.get("/user/:id", authController.getUser)
router.get("/", authController.helloworld)
router.get("/user", authController.getUsers)
router.post("/user", authController.createUser)
router.put("/user", authController.updateUser)
router.delete("/user/:id", authController.deleteUser)

export { router as userRouter }