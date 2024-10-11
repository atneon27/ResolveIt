import express, { Request, Response } from "express";
import { Complain } from "./db";
const router = express.Router();

router.get('/about', (req, res) => {
    res.status(200).json({
        msg: "This is the Student Route Handler"
    })
})
export default router;