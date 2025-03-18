import adminModel from "../models/admin.model.js";
import userModel from "../models/user.model.js"

export const AddSubscribers = async ({email})=>{
    if(!email){
        throw new Error("email id Required")
    }

    const user = await userModel.findOne({email:email})

    if(!user){
        throw new Error("First Register Than Subscribe")
    }

   const admin = await adminModel.findOne();


  if (admin.subscribers.includes(user._id)) {
    throw new Error("User is already subscribed");
  }

  // Push user ID into subscribers array
  admin.subscribers.push(user._id);
  await admin.save();
  
  return
}