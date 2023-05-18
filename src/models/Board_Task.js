import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { Board } from "./Board.js";
import { Task } from "./Task.js";

const Board_Task = sequelize.define("board_task", {

    TaskId: {
        type: DataTypes.INTEGER,
        references: {
            model: Task,
            key: "id"
        }
    },
    BoardId: {
        type: DataTypes.INTEGER,
        references: {
            model: Board,
            key: "id"
        }
    },

})

export { Board_Task }