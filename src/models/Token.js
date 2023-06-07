import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";

const Token = sequelize.define("token", {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false })

export default Token