import { Router } from "express";
import TaskController from "../controllers/taskController.js";

const router = new Router();

router.post("/task/", TaskController.createTask)
router.get("/task", TaskController.getTasks)
router.delete("/task/:id", TaskController.deleteTask)
router.put("/task/", TaskController.updateTask)

export { router as taskRouter }