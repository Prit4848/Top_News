import * as aiservices from '../services/ai.services.js'

export const getSummery = async (req,res,next)=>{
    try {
        const {prompt} = req.body;

        const result = await aiservices.getsummery({prompt})

        res.status(200).json({result:result})
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}