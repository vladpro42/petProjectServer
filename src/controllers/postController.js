import { Board } from "../models/Board.js";
import { Task } from "../models/Task.js";


class CreatePostController {

    async createTask(req, res) {
        try {
            const { user_id, boardId, title, items } = req.body;

            const [item] = items

            const { content, task_id } = item


            const board = await Board.create({
                title,
                boardId,
            })


            const task = await Task.create({
                content,
                task_id,
                user_id,
                board_id: board.id
            })
            res.json({
                title: board.title,
                boardId: board.boardId,
                items: [
                    { task: task.task_id, content: task.content }
                ],
                user_id: task.user_id,
            })
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }

    }

    async getPost(req, res) {
        /*  try {
             const { content, id } = req.body;
             const post = await Task.create({
                 content,
                 post_id: id,
             })
             res.json(post)
         } catch (error) {
             res.status(400).json({ message: error.message, error: error })
         } */
    }

    async getPosts(req, res) {
        try {
            const posts = await Task.findAll();
            const board = await Board.findAll();

            console.log(board.toJson(), "board")
            console.log(posts.toJson(), "posts")
            res.json(posts)
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

export default new CreatePostController();