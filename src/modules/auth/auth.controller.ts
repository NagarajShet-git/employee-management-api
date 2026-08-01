import { Request, Response } from 'express'
import * as AuthService from './auth.service'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { env } from '../../config/env'

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, passwordHash } = req.body
        const isUserExist = await AuthService.findUsers(email)
        if (isUserExist.length !== 0) {
            return res.status(409).json({
                "success": false,
                "message": "User already exists"
            })
        }

        const saltRounds = 12;

        const hashedPassword = await bcrypt.hash(passwordHash, saltRounds)
        const user = await AuthService.createUser({ name, email, passwordHash: hashedPassword })

        return res.status(201).json({
            success: true,
            message: 'Registered',
            data: { id: user._id }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal Server error'
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await AuthService.findUsers(email)
        if (user.length === 1) {
            const isMatch = await bcrypt.compare(password, user[0].passwordHash)
            const loggedInUser = user[0]
            const jwt_secret = env.JWT_SECRET || undefined
            if (!jwt_secret) {
                throw new Error("JWT_SECRET is not defined");
            }

            if (isMatch) {
                const token = jwt.sign(
                    {
                        userId: loggedInUser.id,
                        role: loggedInUser.role
                    },
                    jwt_secret,
                    { expiresIn: "1hr" })
                return res.status(200).json({
                    success: true,
                    message: 'login successful',
                    data: {
                        user: loggedInUser,
                        token
                    }
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                })
            }
        }
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Internal Server error'
        })
    }
}