import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { Students } from "../db/schema";

const router = express.Router();

type StudentDetails = {
    reg_no: String,
    password: String,
    firstname: String,
    lastname: String,
    currentHostel: String,
    currentWing: String,
    currentRoom: String
};

type AdminDetails = {
    admin_id: String,
    password: String,
    firstname: String,
    lastname: String,
    dpt_name: String,
    assignedHostel: String,
};

type WorkerDetails = {
    worker_id: String,
    password: String,
    firstname: String,
    lastname: String,
    assignedHostel: String,
}

router.post('/student/signup', async (req, res) => {
    const User: StudentDetails = req.body;

    const student = await Students.create({
        regno: User.reg_no,
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
    const {reg_no, password}: StudentDetails = req.body;

    const student = await Students.find({
        reg_no,
        password
    });

    if(student) {
        const token = jwt.sign({
            reg_no,
        }, JWT_SECRET);
        res.status(200).json({
            user_token: token,
        })
    } else {
        res.status(404).json({
            msg: "an error",
        })
    }
});


export default router;