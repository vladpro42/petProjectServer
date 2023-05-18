import { Board } from "../models/Board.js";
import { Task } from "../models/Task.js";


class TaskController {

    async createTask(req, res) {
        try {
            const { user_id, boardId, items } = req.body;

            const [item] = items

            const { content, task_id } = item

            const board = await Board.findOne({ where: { boardId } })


            const task = await Task.create({
                content,
                task_id,
                user_id,
                board_id: board.id,
                //BoardId: board.id
            })
            res.json({ message: "Таск успешно создан", task: task })
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

    async updatePost(req, res) {

    }

    async deleteTask(req, res) {
        try {
            const id = +req.params.id;

            if (!task_id) {
                throw new Error("Некорректный id")
            }

            const task = await Task.findOne({ where: id })
            const removeTask = await task.destroy();

            res.json({ message: "Успешно удален", removeTask: removeTask })
        } catch (error) {
            res.status(500).json({ message: error.message, error: error })
        }
    }
}

export default new TaskController();