import { Todo } from "../models/Todo.js";


class CreatePostController {

    async createPost(req, res) {
        try {
            const { content, id, user_id } = req.body;

            const post = await Todo.create({
                content,
                post_id: id,
                user_id: user_id,
            })
            res.json(post)
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }

    }

    async getPost(req, res) {
        /*  try {
             const { content, id } = req.body;
             const post = await Todo.create({
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
            const posts = await Todo.findAll();

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


            const deletePost = await Todo.destroy({ where: { post_id } })
            res.json("успешно удален")
        } catch (error) {
            res.status(400).json({ message: error.message, error: error })
        }
    }
}

export default new CreatePostController();