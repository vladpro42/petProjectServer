import { Router } from "express";
import boardController from "../controllers/boardController.js";

const router = new Router();

router.post("/board/", boardController.createBoard)
router.get("/board/", boardController.getBoards)
router.put("/board/", boardController.updateBoard)
router.delete("/board/:id", boardController.deleteBoard)

export { router as boardRouter }