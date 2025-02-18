import * as userService from "../services/user.services.js";
import { validationResult } from "express-validator";

export const createUserController = async (req, res) => {


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { firstname,lastname, email, password } = req.body;

        const user = await userService.createUser({ firstname,lastname, email, password });
        const token = user.generateToken();

        res.status(201).json({ user, token });
    } catch (error) {

        console.log(error);

        res.status(500).send(error.message);
    }
}


export const loginUserController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { email, password } = req.body;

        const user = await userService.loginUser({ email, password });

        const token = user.generateToken();

        return res.status(200).json({ user, token });

    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
}

export const profile = async (req,res)=>{
    try {
        const user = req.user;

        res.status(200).json({user:user})
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
}

export const logout = async (req,res)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

        await userService.blacklistToken({token})

        res.clearCookie('token')

        res.status(200).json({message:"Log Out"})
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
}

export const contactus = async (req,res)=>{
    try {
        const {name,message,email} = req.body;

        const result = await userService.contactUs({name,message,email})
        
        res.status(200).json({result})
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
}
