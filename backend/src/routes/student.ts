import express, { Request, Response } from "express";
import { Complain, Students } from "../db/schema";
import AuthMiddleware from "./middleware";
import mongoose from "mongoose";
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

router.post('/raiseComplain', async (req: Request<{}, {}, ComplainBody, {comp_uid: String}>, res) => {
    const StudentComplain: ComplainBody = req.body;
    const complain_id = typeof req.query.comp_uid === 'string' ? req.query.comp_uid : '';

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

    await Students.updateOne({
        reg_no: "something"
    }, {
        $pull: {
            activeComplains: new mongoose.Types.ObjectId(complain_id)
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