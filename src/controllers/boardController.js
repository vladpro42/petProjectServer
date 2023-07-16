import { Board } from "../models/Board.js";
import boardService from "../services/boardService.js";

class BoardController {

    async createBoard(req, res) {
        try {
            const { boardId, title, order } = req.body;
            const board = await boardService.createBoard(boardId, title, order)
            res.json(board)
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }

    async getBoards(req, res) {
        try {
            const boards = await boardService.getBoards()
            res.json(boards);
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }

    async updateBoard(req, res) {

        try {
            const { title, order, id } = req.body;
            const board = await Board.findOne({ where: id });
            if (title) {
                board.title = title;
                await board.save();
            }

            if (order) {
                board.update({
                    order: order
                });
            }
            res.json(board)
        } catch (error) {
            res.status(400).json({ message: error.message, error });
        }
    }

    async moveBoard(req, res) {
        try {
            const { id, order } = req.body
            const update = await boardService.updateOrderBoard(id, order)
            res.json(update)
        } catch (error) {
            res.status(400).json({ message: error.message, error });
        }
    }

    async deleteBoard(req, res) {
        try {
            const id = req.params.id;
            const board = await boardService.deleteBoard(id)
            res.json({ message: "Успешно удален", target: board });
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }

    }

}

export default new BoardController();