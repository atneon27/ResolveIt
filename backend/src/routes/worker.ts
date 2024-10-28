import express from "express";
const router = express.Router();

router.get('/resolveComplain', (req, res) => {
    res.status(200).json({
        msg: "success!"
    });
});

router.get('/resolveTask', (req, res) => {
    res.status(200).json({
        msg: "Success!"
    });
})

router.get('/resolvedTask', (req, res) => {
   res.status(200).json({
        msg: "Success"
   }); 
});
export default router;