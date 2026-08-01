import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface AuthJwtPayload extends JwtPayload {
    userId: number;
    role: string;
}
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
            return
        }
        const token = authHeader.split(' ')[1]
        const secret = env.JWT_SECRET as string

        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decode = jwt.verify(token, secret) as AuthJwtPayload
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
        return
    }
}