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
        (req as CustomRequest).headers.user_data = decode.reg_no;
        next(); 
    } catch(err) {
        res.status(400).json({
            msg: "Unauthorized!"
        });
        return;
    }
}