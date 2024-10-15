import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { Admins, Students, Workers } from "../db/schema";

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
    const StudentUser: StudentDetails = req.body;
    try {
        const existingStudent = await Students.findOne({
            reg_no: StudentUser.reg_no
        });
        if(existingStudent) {
            res.status(400).json({
                err: "Email Already Exists!"
            });
        }
        
        const student = await Students.create({
            regno: StudentUser.reg_no,
            password: StudentUser.password,
            details: {
                currentHostel: StudentUser.currentHostel,
                currentWing: StudentUser.currentWing,
                currentRoom: StudentUser.currentRoom
            }
        });
    
        res.status(201).json({
            msg: "Student Registered Successfully!"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});

router.post('/student/signin', async(req, res) => {
    const {reg_no, password}: StudentDetails = req.body;
    try {
        const student = await Students.find({
            reg_no,
            password
        });

        if(student) {
            const token = jwt.sign({
                reg_no
            }, JWT_SECRET);
            res.status(200).json({
                token
            });
        } else {
            res.status(500).json({
                msg: "Internal Error!"
            });
        }
    } catch(err) {
        res.status(400).json({
            msg: "Internal Server Error!"
        });
    }
});

router.post('/admin/signup', async (req, res) => {
    const AdminUser: AdminDetails = req.body;

    const admin = await Admins.create({
        admin_id: AdminUser.admin_id,
        password: AdminUser.password,
        firstname: AdminUser.firstname,
        lastname: AdminUser.lastname,
        dpt_name: AdminUser.dpt_name,
        assignedHostel: AdminUser.assignedHostel,
    });

    res.status(200).json({
        msg: "Admin Created!"
    });
});

router.post('/admin/signin', async(req, res) => {
    const { admin_id, password }: AdminDetails = req.body;

    const student = await Students.find({
        admin_id,
        password
    });

    if(student) {
        const token = jwt.sign({
            admin_id
        }, JWT_SECRET);
        res.status(200).json({
            token: token
        });
    } else {
        res.status(200).json({
            msg: "Error while Signin"
        })
    }
});

router.post('/worker/signup', async (req, res) => {
    const WorkerUser: WorkerDetails = req.body;

    const worker = await Workers.create({
        worker_id: WorkerUser.worker_id,
        password: WorkerUser.password,
        firstname: WorkerUser.firstname,
        lastname: WorkerUser.lastname,
        assignedHostel: WorkerUser.assignedHostel
    });

    res.status(200).json({
        msg: "Worker Created!"
    })
});

router.post('/worker/singin', (req, res) => {
    
});

export default router;