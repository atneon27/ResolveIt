import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../secret";

interface CustomRequest extends Request {
    user_data: string | JwtPayload,
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
        const decode = jwt.verify(token, JWT_SECRET);
        (req as CustomRequest).user_data = decode;
        next(); 
    } catch(err) {
        res.status(400).json({
            msg: "Unauthorized!"
        });
        return;
    }
}