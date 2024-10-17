import express from "express";
import StudentRouter from "./routes/student";
import AdminRouter from "./routes/admin";
import AuthRouter from "./routes/auth";

const app = express();
app.use(express.json());

app.use('/auth', AuthRouter);
app.use('/student', StudentRouter);
app.use('/admin', AdminRouter);

app.listen(3000);