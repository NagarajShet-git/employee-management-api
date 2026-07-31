import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validateEmployee = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction): void | Response => {
        try {
            schema.parse(req.body)
            next()
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error
            });
        }
    }
}