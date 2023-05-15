import { Sequelize } from "sequelize";
import { Board } from "../models/Board.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";
import { sequelize } from "../db/db.js";
import { Board_Task } from "../models/Board_Task.js";


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

            /* const boards = board.map(item => {
                return {
                    boardId: item.boardId,
                    title: item.title,


                    items: tasks.map(async (child) => {
                        if (child.board_id === item.id) {
                            console.log({ task_id: child.task_id, content: child.content, author: await getAuthor(child.user_id) })
                            await Promise.all(arr.map(async el => ++el))
                            return {
                                task_id: child.task_id, content: child.content, author: await getAuthor(child.user_id)
                            }

                        }
                    }).filter(child => child !== null && child !== undefined)
                }
            }); */


            const boards = await Board.findAll({ include: Task });
            console.log(JSON.stringify(boards, null, 2))

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


            const deletePost = await Task.destroy({ where: { post_id } })
            res.json("успешно удален")
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }
}

export default new TaskController();