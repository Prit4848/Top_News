import config from "../config/config.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import nodemailer from 'nodemailer'


export const createUser = async ({ firstname,lastname, email, password, }) => {

    if (!firstname || !lastname || !email || !password) {
        throw new Error("All fields are required [username, email, password]");
    }

    const isUserAlreadyExist = await userModel.findOne({email:email})

    if (isUserAlreadyExist) {
        throw new Error("User already exists");
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = new userModel({
        name:{firstname,lastname},
        email,
        password: hashedPassword
    });

    await user.save();

    delete user._doc.password;

    return user;

}

export const loginUser = async ({ email, password }) => {
    const user = await userModel.findOne({
        email,
    }).select("+password");

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new Error("Invalid credentials");
    }

    delete user._doc.password;

    return user;
}

export const blacklistToken = async ({token})=>{
 await blacklistTokenModel.create({token:token})  

 return;
}

export const contactUs = async ({name,message,email})=>{
    if (!name || !message || !email) {
        throw new Error("[name,message,email] all fiels are required");
    }

    const transporter = nodemailer.createTransport({
        host: `smtp.gmail.com`,
        secure: false,
        port: 587,
        auth: {
          user: `${config.EMAIL_USER}`,
          pass: `${config.EMAIL_PASS}`,
        },
      });
  
      const mailOptions = {
        from: `${config.EMAIL_USER}`,
        to: `${config.MYEMAIL}`,
        subject: "user can contact with us",
        text: ` My name is: ${name},email ${email} and my messege ${message}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return error;
        } else {
         return info;
        }
      });
}