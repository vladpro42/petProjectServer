import { Router } from "express";
import TaskController from "../controllers/taskController.js";
import authMiddlware from "../middleware/authMiddlware.js";

const router = new Router();

router.post("/task/", authMiddlware, TaskController.createTask)
router.get("/task", authMiddlware, TaskController.getTasks)
router.delete("/task/:id", authMiddlware, TaskController.deleteTask)
router.put("/task/", authMiddlware, TaskController.updateTask)

export { router as taskRouter }