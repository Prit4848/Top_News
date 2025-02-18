import {body} from 'express-validator'
import blacklistTokenModel from '../models/blacklistToken.model.js';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import config from '../config/config.js';


export const registerUserValidation = [
    body('firstname')
        .isString()
        .withMessage('first must be a string')
        .isLength({ min: 3, max: 15 })
        .withMessage('firstname must be between 3 and 15 characters'),
    body('lastname')
        .isString()
        .withMessage('lastname must be a string')
        .isLength({ min: 3, max: 15 })
        .withMessage('lastname must be between 3 and 15 characters'),
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
]


export const loginUserValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
]

export const contactUsValidator = [
    body('name')
        .isString()
        .withMessage('first must be a string')
        .isLength({ min: 3, max: 15 })
        .withMessage('name must be between 3 and 15 characters'),
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email'),
    body('message')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 1 })
        .withMessage("message must be at least 1 characters")
]

export const authUserMiddleweare = async (req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized User: No token provided" });
        }
        
        const blacklistToken = await blacklistTokenModel.findOne({ token });
        if (blacklistToken) {
            return res.status(401).json({ message: "Unauthorized User: Token is blacklisted" });
        }

       
        const decoded = await userModel.verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized User: Invalid token" });
        }

        
        const user = await userModel.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}