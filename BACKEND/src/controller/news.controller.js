import * as newsServices from '../services/news.service.js'
import {validationResult} from 'express-validator'

export const getnews = async (req,res)=>{
     const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    try {
        const {prompt} = req.body;
        
        const result = await newsServices.NewsApiResult({prompt:prompt})

        res.status(200).json({result:result})
    
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}