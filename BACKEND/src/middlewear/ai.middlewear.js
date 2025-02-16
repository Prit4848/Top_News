import {body} from 'express-validator'

export const  newsPromtValidation= [
    body('article')
        .isString()
        .withMessage('first must be a string')
        .isLength({ min: 3})
        .withMessage('firstname must be between 3  characters'), 
]

export const  newsTranslateValidator= [
    body('text')
        .isString()
        .withMessage('first must be a string')
        .isLength({ min: 3})
        .withMessage('firstname must be between 3  characters'),
    body('language')
        .isString()
        .withMessage('first must be a string')
        .isLength({ min: 2})
        .withMessage('firstname must be between 2  characters'), 
]