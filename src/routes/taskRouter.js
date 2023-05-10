import { Router } from "express";
import TaskController from "../controllers/taskController.js";

const router = new Router();

router.post("/post", TaskController.createTask)
router.get("/post", TaskController.getPosts)
router.delete("/post/:post_id", TaskController.deletePost)

export { router as taskRouter }