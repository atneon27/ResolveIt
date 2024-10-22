import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../secret";

interface CustomRequest extends Request {
    headers: IncomingHttpHeaders & {
        user_data?: String | JwtPayload,
    }
}

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization ?? '';
    
    if(!token) {
        res.status(400).json({
            msg: "Unauthorized!"
        });
        return;
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const possibleKeys = ["reg_no", "admin_id", "worker_id"];

        const user_id  = possibleKeys.find(key => decode[key]);
        if(user_id) {
            (req as CustomRequest).headers.user_data = decode[user_id];
        }
        next(); 
    } catch(err) {
        res.status(400).json({
            msg: "Unauthorized!"
        });
        return;
    }
}