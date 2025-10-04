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

export const loginUser = async ({ email, password,req }) => {
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

     user.logs.push({
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
    await user.save();

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

export const forgotPassword = async ({email})=>{
  if(!email){
    throw new Error("Email is Required");
  }
  const otp = Math.floor(100000 + Math.random())
  await userModel.findByIdAndUpdate({email},{otp},{new:true})

  const transporter = nodemailer.createTransport({
      host: `smtp.gmail.com`,
      secure: false,
      port: 587,
      auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_USER}`,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is: ${otp}`,
    };

    return {transporter,mailOptions}
}

export const enter_otp = async ({email,newotp})=>{
   if(!email){
    throw new Error("Email os Required")
   }

   let user = await userModel.findOne({ email });

   if (!user) {
     throw new Error('module has user not found')
   }

   if (user.otp != newotp) {
     throw new Error('Password are Wrong')
   } 

   return email
}

export const change_Password = async ({email,newpassword})=>{
    if(!email || !newpassword){
        throw new Error("[newpassword,email] are Required")
    }

    const hash = await userModel.hashPassword(newpassword);

    const user = await userModel.findOneAndUpdate({email},{password:hash},{new:true});

    await user.save();

    return user;
}