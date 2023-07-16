import { Board } from "../models/Board.js";
import { Task } from "../models/Task.js";

class TaskService {
    async getTasks() {
        const boards = await Board.findAll({
            include: {
                model: Task,
                as: "items"
            }
        });
        if (boards == null || boards == undefined) {
            throw new Error("null or Undefined")
        }
        return boards
    }

    async findTask(id) {
        const task = await Task.findOne({ where: { id: +id } });
        if (!task) {
            throw new Error("Не найден Таск")
        }
        return task
    }

    async updateTask(task) {

    }
}

export default new TaskService()