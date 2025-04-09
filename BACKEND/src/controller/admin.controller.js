import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import config from "../config/config.js";
import * as adminServices from "../services/admin.services.js"

export const loginAdmin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  try {
    const {email,password} = req.body;

    if(!email === 'admin@gmail.com' || !password === 123456){
    res.status(401).json({"message":"admin is not Authenticated"})
    }
    
    const token = jwt.sign(
            {
                email: email,
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRES_IN,
            });

    res.status(200).json({token})
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const addSubscribers = async (req,res) => {
  try {
    const {email} = req.body;

    await adminServices.AddSubscribers({email})

    res.status(200).json({"message":"Subscribe Successfully✅"})

  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};


export const sendUpdates = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageBuffer = req.file?.buffer;
    const imageName = req.file?.originalname;

    if (!imageBuffer) {
      return res.status(400).json({ error: 'Image is required' });
    }

    await adminServices.SendEmail({ name, description, imageBuffer, imageName });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};


export const Profile = async (req,res)=>{
  try {
    const admin = req.Admin;

    res.status(200).json(admin)
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
