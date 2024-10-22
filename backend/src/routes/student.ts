import express, { Request, Response } from "express";
import { Complain, Students } from "../db/schema";
import AuthMiddleware from "./middleware";
const router = express.Router();

type ComplainBody = {
    raisedBy: String,
    raisedFor: String,
    currHostel: String,
    currWing: String,
    currRoom: String,
    compSubject: String,
    compBody: String,
    feedback?: String
};

router.use(AuthMiddleware);

router.post('/raiseComplain', async (req, res) => {
    const StudentComplain: ComplainBody = req.body;

    const comp = await Complain.create({
        raisedBy: StudentComplain.raisedBy,
        raisedFor: StudentComplain.raisedFor,
        body: {
            currHostel: StudentComplain.currHostel,
            currWing: StudentComplain.currWing,
            currRoom: StudentComplain.currRoom,
            complainSubject: StudentComplain.compSubject,
            complainBody: StudentComplain.compBody
        }
    });

    console.log(comp);
    res.status(200).json({
        msg: "complain raised",
        reff_id: comp._id,
    })
});

router.get('/complains', async(req, res) => {
    const result = await Complain.find({});
    res.status(200).json({
        result
    })
});

router.get('/info', async(req, res) => {
    const user = await Students.findOne({
        reg_no: req.headers.user_data
    });
    
    res.status(200).json({
        reg_no: user?.reg_no,
        firstname: user?.firstname,
        lastname: user?.lastname,
        currHostel: user?.HostelDetails?.currHostel,
        currWing: user?.HostelDetails?.currWing,
        currRoom: user?.HostelDetails?.currRoom
    });
});

export default router;