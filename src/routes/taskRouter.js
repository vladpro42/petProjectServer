import { Router } from "express";
import TaskController from "../controllers/taskController.js";

const router = new Router();

router.post("/", TaskController.createTask)
router.get("/", TaskController.getTasks)
router.delete("/:id", TaskController.deletePost)

export { router as taskRouter }