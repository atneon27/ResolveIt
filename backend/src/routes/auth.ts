import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { Admins, Students, Workers } from "../db/schema";
import AuthMiddleware from "./middleware";

const router = express.Router();

type StudentDetails = {
    reg_no: String,
    password: String,
    firstname: String,
    lastname: String,
    currHostel: String,
    currWing: String,
    currRoom: String
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

router.use(AuthMiddleware);

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
        } else {
            const student = await Students.create({
                reg_no: StudentUser.reg_no,
                password: StudentUser.password,
                firstname: StudentUser.firstname,
                lastname: StudentUser.lastname,
                HostelDetails: {
                    currHostel: StudentUser.currHostel,
                    currWing: StudentUser.currWing,
                    currRoom: StudentUser.currRoom
                }
            });
        
            res.status(201).json({
                msg: "Student Registered Successfully!"
            });
        }
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
            res.status(400).json({
                msg: "Invalid Student Details!"
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
    try {
        const existingAdmin = await Admins.findOne({
            admin_id: AdminUser.admin_id,
        });

        if(existingAdmin) {
            res.status(400).json({
                msg: "Admin Already Exists!"
            });
        } else {
            const admin = await Admins.create({
                admin_id: AdminUser.admin_id,
                password: AdminUser.password,
                firstname: AdminUser.firstname,
                lastname: AdminUser.lastname,
                dpt_name: AdminUser.dpt_name,
                assignedHostel: AdminUser.assignedHostel,
            });
        
            res.status(201).json({
                msg: "Admin Registered Successfully!"
            });
        }
    } catch(err) {
        res.status(500).json({
            msg: "Internal Server Error!"
        })
    }
});

router.post('/admin/signin', async(req, res) => {
    const { admin_id, password }: AdminDetails = req.body;
    try {
        const admin = await Admins.findOne({
            admin_id,
            password
        });
        
        if(admin) {
            const token = jwt.sign({
                admin_id
            }, JWT_SECRET);
            res.status(200).json({
                token
            });
        } else {
            res.status(400).json({
                msg: "Invalid Admin Details!"
            });
        }
    } catch(err) {
        res.status(500).json({
            msg: "Internal Server Error!"
        });
    }
});

router.post('/worker/signup', async (req, res) => {
    const WorkerUser: WorkerDetails = req.body;
    try {
        const existingWorker = await Workers.findOne({
            worker_id: WorkerUser.worker_id,
            password: WorkerUser.password
        });

        if(existingWorker) {
            res.status(400).json({
                msg: "Worker Already Exists!"
            });
        } else {
            const worker = await Workers.create({
                worker_id: WorkerUser.worker_id,
                password: WorkerUser.password,
                firstname: WorkerUser.firstname,
                lastname: WorkerUser.lastname,
                assignedHostel: WorkerUser.assignedHostel
            });
        
            res.status(200).json({
                msg: "Worker Created!"
            });
        }
    } catch(err) {
        res.status(500).json({
            msg: "Internal Server Error!"
        });
    }
});

router.post('/worker/signin', async(req, res) => {
    const { worker_id, password }: WorkerDetails = req.body;
    try {
        const worker = await Workers.findOne({
            worker_id,
            password,
        });

        if(worker) {
            const token = jwt.sign({
                worker_id
            }, JWT_SECRET);
            res.status(200).json({
                token,
            });
        } else {
            res.status(400).json({
                msg: "Invlaid Worker Details!"
            });
        }
    } catch(err) {
        res.status(500).json({
            msg: "Internal Server Error!"
        });
    }
});

export default router;