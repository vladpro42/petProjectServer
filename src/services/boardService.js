import { Op } from "sequelize";
import { Board } from "../models/Board.js";
import { sequelize } from "../db/db.js";

class BoardService {
    async createBoard(boardId, title, order) {

        const board = await Board.create({
            title,
            boardId,
            order
        });
        return board
    }

    async getBoards() {
        const boards = await Board.findAll();
        return boards
    }

    async findOneBoard(id) {
        const board = await Board.findOne({
            where: {
                id
            }
        });
        return board
    }

    async deleteBoard(id) {
        if (!id) {
            throw new Error("Отсутствует id");
        }
        const board = await Board.findOne({ where: { boardId: id } })
        if (!board) {
            throw new Error("Board not found")
        }
        await board.destroy();
        return board
    }

    async updateBoard(title, order, id) {

        const board = await this.findOneBoard(id)

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
    }

    async findAllBoards() {
        const boards = await Board.findAll()
        return boards
    }

    async updateOrderBoard(id, order) {
        const boards = await this.findAllBoards()
        boards.forEach(board => board.decrement("order"))
        const board = await this.findOneBoard(id);
        if (!board) throw new Error("НЕ найден board");
        await board.update("order", order)
        return board
    }
}

export default new BoardService();