import { Router } from "express";
import boardController from "../controllers/boardController.js";

const router = new Router();

router.post("/", boardController.creacteBoard)
router.get("/", boardController.getBoards)

export { router as boardRouter }