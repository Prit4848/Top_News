import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        require:true,
        unique:true
    },
    createAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
})

const blacklistTokenModel = mongoose.model("blacklistToken",blacklistTokenSchema)

export default blacklistTokenModel;