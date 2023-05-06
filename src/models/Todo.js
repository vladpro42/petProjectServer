import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";

const Todo = sequelize.define("Todo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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

})

export { Todo }