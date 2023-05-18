import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";

const Icon = sequelize.define("icon", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fileName: {
        type: DataTypes.STRING,
    },
    src: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },

})

export { Icon }