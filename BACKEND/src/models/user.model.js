import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userSchema = new mongoose.Schema({
  name: {
    firstname: {
      type: String,
      minlength: [3, "Minimum length of first name must be 3"],
    },
    lastname: {
      type: String,
      minlength: [3, "Minimum length of last name must be 3"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Minimum length of email must be 5"],
  },
  password: {
    type: String,
    select: false,
  },
  googleId: {
    type: String, // store Google sub (unique ID from Google)
    unique: false, // allow null for manual accounts
    sparse: true,
  },
  profilePic: {
    type: String, // Google profile picture URL
  },
  otp: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  logs: [
    {
      loginAt: { type: Date, default: Date.now },
      ip: { type: String },
      userAgent: { type: String },
    },
  ],
});

// 🔑 Hash password before saving (manual users only)
userSchema.statics.hashPassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
  }
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// 🔑 Compare password (manual login only)
userSchema.methods.comparePassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
  }
  if (!this.password) {
    throw new Error("This account uses Google login only");
  }
  return bcrypt.compare(password, this.password);
};

// 🔑 Generate JWT
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRES_IN,
    }
  );
  return token;
};

// 🔑 Verify JWT
userSchema.statics.verifyToken = function (token) {
  if (!token) {
    throw new Error("Token is required");
  }
  return jwt.verify(token, config.JWT_SECRET);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
