import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo_list", "postgres", "07sepodu", {
    host: "localhost",
    dialect: "postgres",
    logging: false,
});

export { sequelize }