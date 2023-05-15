import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";
import { Board } from "./Board.js";

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    task_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    /* board_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Board,
            key: "id",
        }
    } */

})

export { Task }