import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const adminModel = mongoose.Model("admin",AdminSchema)

export default adminModel;
