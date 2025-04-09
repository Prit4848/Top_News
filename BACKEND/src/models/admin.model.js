import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  subscribers: [
    {
      type: String,
      require:true,
    },
  ],
});


const adminModel = mongoose.model("admin", AdminSchema);

export default adminModel;
