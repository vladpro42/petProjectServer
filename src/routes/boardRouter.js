import { Router } from "express";
import boardController from "../controllers/boardController.js";

const router = new Router();

router.post("/", boardController.createBoard)
router.get("/", boardController.getBoards)

export { router as boardRouter }