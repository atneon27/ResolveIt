import express from "express";
const router = express.Router();

router.get('/resolveComplain', (req, res) => {
    res.status(200).json({
        msg: "success!"
    });
});

export default router;