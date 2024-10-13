import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { Students } from "../db/schema";

const router = express.Router();

type StudentDetails = {
    regno: String,
    password: String,
    currentHostel: String,
    currentWing: String,
    currentRoom: String
};

router.post('/student/signup', async (req, res) => {
    const User: StudentDetails = req.body;

    const student = await Students.create({
        regno: User.regno,
        password: User.password,
        details: {
            currentHostel: User.currentHostel,
            currentWing: User.currentWing,
            currentRoom: User.currentRoom
        }
    });

    res.status(200).json({
        msg: "Student Created"
    })
});

router.post('/student/signin', async(req, res) => {
    const {regno, password}: StudentDetails = req.body;

    const student = await Students.find({
        regno,
        password
    });

    if(student) {
        const token = jwt.sign({
            regno,
        }, JWT_SECRET);
        res.status(200).json({
            user_token: token,
        })
    } else {
        res.status(404).json({
            msg: "an error",
        })
    }
})


export default router;