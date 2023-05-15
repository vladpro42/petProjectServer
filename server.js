import express from "express"
import { userRouter } from "./src/routes/userRouter.js";
import { sequelize } from "./src/db/db.js"
import { Task } from "./src/models/Task.js";
import { authRouter } from "./src/routes/authRouter.js";
import { taskRouter } from "./src/routes/taskRouter.js";
import { Board } from "./src/models/Board.js";
import { boardRouter } from "./src/routes/boardRouter.js";
import { Board_Task } from "./src/models/Board_Task.js";


const PORT = process.env.PORT || 3001;

const app = express();

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

Board.hasMany(Task, {foreignKey: "board_id"});
Task.belongsTo(Board);



sequelize.sync({ alter: true }).then(() => {
    console.log("Tables have been created");
}).catch(err => console.log(err));

// await sequelize.sync();


app.use(express.json());
app.use("/api", userRouter);
app.use("/auth", authRouter);

app.use("/board", boardRouter)
app.use("/task", taskRouter);


app.get("/", (req, res) => {
    res.json("hello world")
})



app.listen(PORT, () => {
    console.log("Сервер стартовал на порту:", PORT)
})