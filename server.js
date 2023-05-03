import express from "express"
import { userRouter } from "./src/routes/userRouter.js";


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use("/api", userRouter)


app.get("/", (req, res) => {
    res.json("hello world")
})


app.listen(PORT, () => {
    console.log("Сервер стартовал на порту:", PORT)
})