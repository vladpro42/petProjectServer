import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";

const Icon = sequelize.define("Icon", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    file_name: {
        type: DataTypes.STRING,
    },
    src: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },

})

export { Icon }