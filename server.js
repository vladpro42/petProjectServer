import express from "express"
import { userRouter } from "./src/routes/userRouter.js";
import { sequelize } from "./src/db/db.js"
import { User } from "./src/models/User.js";
import { Task } from "./src/models/Task.js";
import { Icon } from "./src/models/Icon.js";
import { authRouter } from "./src/routes/authRouter.js";
import { postRouter } from "./src/routes/postRouter.js";
import { Board } from "./src/models/Board.js";


const PORT = process.env.PORT || 3001;

const app = express();

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

/* Task.belongsToMany(Board, { through: "between" });
Board.belongsToMany(Task, { through: "between" }) */

sequelize.sync({ force: true }).then(() => {
    console.log("Tables have been created");
}).catch(err => console.log(err));


/* User.sync().then(() => {
    console.log("синхронизация таблицы USER")
})

Task.sync({ alter: true }).then(() => {
    console.log("синхронизация таблицы Task")
})

Icon.sync().then(() => {
    console.log("синхронизация таблицы Icon")
})

Board.sync().then(() => {
    console.log("синхронизация таблицы Board")
}) */

app.use(express.json());
app.use("/api", userRouter);
app.use("/auth", authRouter);
app.use("/task", postRouter);


app.get("/", (req, res) => {
    res.json("hello world")
})


app.listen(PORT, () => {
    console.log("Сервер стартовал на порту:", PORT)
})