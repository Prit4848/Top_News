import * as newsServices from '../services/news.service.js'
import * as aiServices from '../services/ai.services.js'
import {validationResult} from 'express-validator'
import path from 'path';
import fs from 'fs'

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

export const getmoredescription = async(req,res)=>{
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {prompt} = req.body;

        const result = await aiServices.getsummery({prompt})

        res.status(200).json({result:result})
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export const getTextToSpeech = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { prompt } = req.body;
      const filePath = await newsServices.gtts(prompt); 
  
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', 'inline; filename="output.mp3"');
      
      res.sendFile(path.resolve(filePath), () => {
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };