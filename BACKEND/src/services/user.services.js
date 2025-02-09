import blacklistTokenModel from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";


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