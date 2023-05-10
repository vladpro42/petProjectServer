import { Router } from "express";
import postController from "../controllers/postController.js";

const router = new Router();

router.post("/post", postController.createTask)
router.get("/post", postController.getPosts)
router.delete("/post/:post_id", postController.deletePost)

export { router as postRouter }