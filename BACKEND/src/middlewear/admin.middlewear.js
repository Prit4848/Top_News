import {body} from 'express-validator'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const loginAdminValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
]

export const SubscribeValidator= [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email'),
]

export const authadminMiddlewear = (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Admin: No token provided" });
    }
    try {
        const Admin = jwt.verify(token,config.JWT_SECRET)

        Admin.req = Admin;

        next()
    } catch (error) {
        console.error("JWT Verification Error:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}