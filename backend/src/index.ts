import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Hi!",
    })
});

app.listen(3000);