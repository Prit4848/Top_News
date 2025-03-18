import {body} from 'express-validator'

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