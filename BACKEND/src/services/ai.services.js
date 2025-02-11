import {GoogleGenerativeAI } from '@google/generative-ai'
import config from '../config/config.js';

export const getsummery = async ({prompt})=>{
    if (!prompt) {
        throw new Error("Prompt is required.");
      }
      const genAI = new GoogleGenerativeAI (`${config.GEMINI_API_KEY}`);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" },{systemInstruction:'get summery in 3 lines'});
      
      const result = await model.generateContent(prompt);
      
      return result.response.text()  
}