import express, { Request, Response } from "express";
import { Complain } from "../db/schema";
const router = express.Router();

type ComplainBody = {
    raisedBy: String,
    raisedFor: String,
    currHostel: String,
    currWing: String,
    currRoom: String,
    compSubject: String,
    compBody: String
};

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

export default router;