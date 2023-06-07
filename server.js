import * as dotenv from 'dotenv'
dotenv.config();
import express from "express"
import { userRouter } from "./src/routes/userRouter.js";
import { sequelize } from "./src/db/db.js"
import { Task } from "./src/models/Task.js";
import { authRouter } from "./src/routes/authRouter.js";
import { taskRouter } from "./src/routes/taskRouter.js";
import { Board } from "./src/models/Board.js";
import { boardRouter } from "./src/routes/boardRouter.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { errorMidlware } from './src/middleware/errorMiddlware.js';

const PORT = +process.env.PORT || 3001;

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json());
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

Board.hasMany(Task, { foreignKey: "boardId", as: "items" });
Task.belongsTo(Board);

sequelize.sync({ alter: true }).then(() => {
    console.log("Tables have been created");
}).catch(err => console.log(err));




app.use("/api", userRouter);
app.use("/api", authRouter);

app.use("/api", boardRouter)
app.use("/api", taskRouter);

app.use(errorMidlware);


app.listen(PORT, () => {
    console.log("Сервер стартовал на порту:", PORT)
})