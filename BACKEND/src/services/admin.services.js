import adminModel from "../models/admin.model.js";
import userModel from "../models/user.model.js"
import nodemailer from 'nodemailer'
import config from "../config/config.js";

export const AddSubscribers = async ({email})=>{
    if(!email){
        throw new Error("email id Required")
    }

    const user = await userModel.findOne({email:email})

    if(!user){
        throw new Error("First Register Than Subscribe")
    }

   let admin = await adminModel.findOne();

   if (!admin) {
    admin = new adminModel({ subscribers: [] });
  }


  if (admin.subscribers.includes(email)) {
    throw new Error("User is already subscribed");
  }

 
  admin.subscribers.push(email);
  await admin.save();
  
  return
}

export const SendEmail = async({ name, description, imageBuffer, imageName }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
      }
    });

    const Admin = await adminModel.find({});
    const toList = Admin.flatMap(admin => admin.subscribers || []); // Adjust based on your schema

    if (!toList.length) {
      throw new Error("No recipients found in admin subscribers.");
    }

    const mailOptions = {
      from: `${config.EMAIL_USER}`,
      to: toList.join(','),
      subject: name,
      html: `
        <h2>${name}</h2>
        <p>${description}</p>
        <img src="cid:image"/>
      `,
      attachments: [
        {
          filename: imageName || 'image.png',
          content: imageBuffer.toString('base64'),
          encoding: 'base64',
          cid: 'image'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
