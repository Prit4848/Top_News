import adminModel from "../models/admin.model.js";
import userModel from "../models/user.model.js";
import nodemailer from "nodemailer";
import config from "../config/config.js";

export const AddSubscribers = async ({ email }) => {
  if (!email) {
    throw new Error("email id Required");
  }

  const user = await userModel.findOne({ email: email });

  if (!user) {
    throw new Error("First Register Than Subscribe");
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

  return;
};

export const SendEmail = async ({
  name,
  description,
  imageBuffer,
  imageName,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: false,
      port: 587,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
      },
    });

    const Admin = await adminModel.find({});
    const toList = Admin.flatMap((admin) => admin.subscribers || []); // Adjust based on your schema

    if (!toList.length) {
      throw new Error("No recipients found in admin subscribers.");
    }

    const mailOptions = {
      from: `${config.EMAIL_USER}`,
      to: toList.join(","),
      subject: name,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #d62828; text-align: center;">${name}</h2>
            <p style="font-size: 16px; color: #333333;">Hello,</p>
            <p style="font-size: 16px; color: #333333;">
              We’re excited to share the latest update from <strong style="color: #003049;">Top News</strong> — your trusted hub for real-time, multilingual news from across the globe!
            </p>
            <p style="font-size: 15px; line-height: 1.6; color: #555555;">${description}</p>
    
            <div style="text-align: center; margin: 20px 0;">
              <img src="cid:image" alt="Update Image" style="max-width: 100%; height: auto; border-radius: 10px;" />
            </div>
    
            <p style="font-size: 16px; color: #333333;">Stay informed with our powerful features:</p>
            <ul style="padding-left: 20px; color: #333333;">
              <li>✅ Live updates from verified sources</li>
              <li>🌍 Multilingual translation support</li>
              <li>🎧 Text-to-speech for easy listening</li>
              <li>📰 Smart news summarization for quick reads</li>
            </ul>
    
            <p style="font-size: 15px; color: #333333;">Thanks for staying connected with <strong style="color: #003049;">Top News</strong>.</p>
            <p style="font-size: 15px; margin-top: 30px; color: #333333;">Best regards,<br><strong>The Top News Team</strong></p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: imageName || "image.png",
          content: imageBuffer.toString("base64"),
          encoding: "base64",
          cid: "image",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
