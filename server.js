import express from "express"
import { userRouter } from "./src/routes/userRouter.js";
import { sequelize } from "./src/db/db.js"
import { User } from "./src/models/User.js";
import { Todo } from "./src/models/Todo.js";
import { Icon } from "./src/models/Icon.js";

    
const PORT = process.env.PORT || 3001;

const app = express();

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

User.sync().then(() => {
    console.log("синхронизация таблицы USER")
})

Todo.sync().then(() => {
    console.log("синхронизация таблицы TODO")
})

Icon.sync().then(() => {
    console.log("синхронизация таблицы Icon")
})

app.use(express.json());
app.use("/api", userRouter)


app.get("/", (req, res) => {
    res.json("hello world")
})


app.listen(PORT, () => {
    console.log("Сервер стартовал на порту:", PORT)
})