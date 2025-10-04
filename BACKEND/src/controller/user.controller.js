import * as userService from "../services/user.services.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";

import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

import { ClodinaryUpload } from "../config/cloudinary.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstname, lastname, email, password } = req.body;

    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password,
    });
    const token = user.generateToken();

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

export const loginUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userService.loginUser({
      email,
      password,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const token = user.generateToken();

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export const profile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log(token);

    await userService.blacklistToken({ token });

    res.clearCookie("token");

    res.status(200).json({ message: "Log Out" });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export const contactus = async (req, res) => {
  try {
    const { name, message, email } = req.body;

    const result = await userService.contactUs({ name, message, email });

    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export const googleLoginController = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google Token is Require" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    if (!ticket) {
      return res.status(401).json({ message: "Invalid Google Token" });
    }

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ message: "Unable To Verify Google Token" });
    }

    const { email, name, picture, sub } = payload;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Google account must have an email" });
    }
    if (!sub) {
      return res.status(400).json({ message: "Invalid Google account ID" });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = sub;
        if (!user.profilePic) {
          user.profilePic = picture;
        }
        user.logs.push({
          ip: req.ip,
          userAgent: req.headers["user-agent"],
        });

        await user.save();
      }
    } else {
      user = new userModel({
        name: {
          firstname: name ? name.split(" ")[0] : "Google",
          lastname: name ? name.split(" ")[1] || "" : "User",
        },
        email,
        password: null,
        googleId: sub,
        profilePic: picture,
      });
      await user.save();
    }

    const authToken = user.generateToken();

    res.status(200).json({
      user,
      token: authToken,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Google login failed" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const ProfileLocalPath = req.file.profile.path;

    if (!ProfileLocalPath) {
      return res.status(400).json({ message: "Profile Localpath Is Require" });
    }

    const profile = await ClodinaryUpload(ProfileLocalPath);

    await userModel.findOneAndUpdate(
      req.user._id,
      {
        $set: { profilePic: profile },
      },
      { new: true }
    );

    res.status(200).json({ message: "Profile Update SuccessFully!" });
  } catch (error) {
    console.error("Server Side Error:", error.message);
    res.status(500).json({ message: "Server  Side Error" });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { transporter, mailOptions } = await userService.forgotPassword({
      email,
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        console.log("OTP sent: " + info.response);
        res
          .status(200)
          .json({ email: email, message: "Otp Send SuccessFully!" });
      }
    });
  } catch (error) {
    console.error("server side Error", error.message);
    res.status(500).json({ message: "Server Side Error" });
  }
};

export const Enter_Otp = async (req, res) => {
  try {
    const { email, newotp } = req.body;

    const otp_email = await userService.enter_otp({ email, newotp });

    res.status(200).json({ email: otp_email });
  } catch (error) {
    console.error("server side Error", error.message);
    res.status(500).json({ message: "Server Side Error" });
  }
};

export const change_Password = async (req, res) => {
  try {
    const { email, newpassword } = req.body;

    const user = await userService.change_Password({ email, newpassword });

    res.status(201).json({ message: "password Change SuccessFully!", user });
  } catch (error) {
    console.error("server side Error", error.message);
    res.status(500).json({ message: "Server Side Error" });
  }
};

export const getAllUserLogs = async (req, res) => {
  try {
    const users = await userModel.find({}, "email name logs").lean();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    console.error("Fetch All Logs Error:", error.message);
    res.status(500).json({ message: "server Error" });
  }
};

export const getUserLogs = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await userModel.findOne({ email }).select("email logs");

    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.status(200).json({ email: user.email, logs: user.logs });
  } catch (error) {
    console.log("Fetch Logs Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
