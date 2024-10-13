import express from "express";
import StudentRouter from "./routes/student";
import AuthRouter from "./routes/auth";

const app = express();
app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/student', StudentRouter);

app.listen(3000);