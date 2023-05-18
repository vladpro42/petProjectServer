import { Board } from "../models/Board.js";

class BoardController {

    async createBoard(req, res) {
        try {

            const { boardId, title } = req.body;

            const board = await Board.create({
                title,
                boardId,
            });

            res.json(board)

        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }

    async getBoards(req, res) {
        try {
            const boards = await Board.findAll();

            res.json(boards);
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }

    async updateBoard(req, res) {
        try {
            const { title } = req.body;
            const id = req.params.id;

            const board = await Board.findOne({ where: id });
            board.title = title;
            await board.save();

            res.json(board)
        } catch (error) {
            res.status(400).json({ message: error.message, error });
        }
    }

    async deleteBoard(req, res) {
        try {
            const id = +req.params.id;

            if (!id) {
                throw new Error("Некорректный id");
            }

            const board = await Board.findOne({ where: id });

            await board.destroy();

            res.json({ message: "Успешно удален", target: board });
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }

    }
}

export default new BoardController();