import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../config/config.js";

const userSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: true,
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
        required: true,
        select:false
    }
})

userSchema.statics.hashPassword = async function (password) {

    if (!password) {
        throw new Error("Password is required");
    }


    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function (password) {
    if (!password) {
        throw new Error("Password is required");
    }

    if (!this.password) {
        throw new Error("Password is required");
    }


    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        {
            email: this.email,
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRES_IN,
        });

    return token;
}

userSchema.statics.verifyToken = function (token) {
    if (!token) {
        throw new Error("Token is required");
    }


    return jwt.verify(token, config.JWT_SECRET);
}

const userModel = mongoose.model("user",userSchema)

export default userModel;