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

            console.log(boards)

            res.json(boards)
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }

    async updatePost(req, res) {

    }

    async deletePost(req, res) {
        try {
            const post_id = +req.params.post_id;

            if (!post_id) {
                throw new Error("Некорректный id")
            }

            const deletePost = await Task.destroy({ where: { post_id } })
            res.json({ message: "Успешно удален", target: deletePost })
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }
}

export default new TaskController();