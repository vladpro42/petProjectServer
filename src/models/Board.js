import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";

const Board = sequelize.define("Board", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    boardId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export { Board }