import express, { Request, Response } from "express";
import { Complain } from "./db";
const router = express.Router();

router.post('/raiseComplain', async (req, res) => {
    const user = await Complain.create({
        raisedBy: req.body.raisedBy,
        body: {
            hostel: req.body.hostel,
            wing: req.body.wing,
            room: req.body.room,
            complainSubject: req.body.complainSubject,
            complainBody: req.body.complainBody,
        }
    });

    console.log(user);
    res.status(200).json({
        msg: "complain raised",
        reffId: user._id,
    })
});

router.get('/complains', async(req, res) => {
    const result = await Complain.find({});
    res.status(200).json({
        result: result,
    })
});

export default router;