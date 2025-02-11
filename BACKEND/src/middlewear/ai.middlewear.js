import {body} from 'express-validator'

export const  newsPromtValidation= [
    body('article')
        .isString()
        .withMessage('first must be a string')
        .isLength({ min: 3})
        .withMessage('firstname must be between 3  characters'), 
]