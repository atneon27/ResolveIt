import express, { Response, Request } from "express";
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

router.post('/raiseComplain', async(req, res) => {
    const AdminComplain: ComplainBody = req.body;

    const comp = await Complain.create({
        raisedBy: AdminComplain.raisedBy,
        raisedFor: AdminComplain.raisedFor,
        body: {
            currHostel: AdminComplain.currHostel,
            currWing: AdminComplain.currWing,
            currRoom: AdminComplain.currRoom,
            complainSubject: AdminComplain.compSubject,
            complainBody: AdminComplain.compBody
        }
    }); 

    res.status(200).json({
        msg: "Complain Raised!",
        reff_id: comp._id
    });
});

router.get('/complains', async(req, res) => {
    const result = await Complain.find({});
    res.status(200).json({
        result
    });
});

export default router;