import {body} from 'express-validator'


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