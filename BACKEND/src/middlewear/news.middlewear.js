import {body} from 'express-validator'

export const  newsPromtValidation= [
    body('prompt')
        .isString()
        .withMessage('first must be a string')
        .isLength({ min: 3})
        .withMessage('firstname must be between 3 and 15 characters'), 
]