import { Board } from "../models/Board.js";
import { Task } from "../models/Task.js";


class TaskController {

    async createTask(req, res) {
        try {
            const { userId, boardId, content, id } = req.body;

            const board = await Board.findOne({ where: { boardId } })

            const task = await Task.create({
                content,
                id,
                userId,
                boardId: board.id,
            })

            res.json({ message: "Таск успешно создан", task, })
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }

    }

    async getTasks(req, res) {
        try {

            const boards = await Board.findAll({
                include: {
                    model: Task,
                    as: "items"
                }
            });

            res.json(boards)
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }

    async updateTask(req, res) {
        try {
            const { userId, boardId, content, id } = req.body;

            if (!boardId && !content) {
                throw new Error("Некоректные данные")
            }

            const task = await Task.findOne({ where: { id: +id } });

            if (!task) {
                res.status(400).json({ message: "Таск не найден" })
            }

            task.set({
                boardId,
                content,
            })

            await task.save();

            res.json(task);

        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }

    async deleteTask(req, res) {
        try {
            const id = req.params.id;

            const task = await Task.findOne({ where: { id: +id } })

            const removeTask = await task.destroy();

            res.json({ message: "Успешно удален", removeTask })
        } catch (error) {
            res.status(500).json({ message: error.message, error: error })
        }
    }
}

export default new TaskController();