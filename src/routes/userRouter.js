import { Router } from "express";
import userController from "../controllers/userController.js";
import { check } from "express-validator";

const router = new Router();

router.get("/user/:id", userController.getUser)
router.get("/user", userController.getUsers)
router.post("/user", [
    check("email", "Емаил должен быть уникальным").isEmail()
], userController.createUser)
router.put("/user", userController.updateUser)
router.delete("/user/:id", userController.deleteUser)

export { router as userRouter }