import express from "express";
import StudentRouter from "./student";

const app = express();
app.use('/student', StudentRouter);

app.listen(3000);