import mongoose from "mongoose";

// Schema, model
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  nickname: String,
  role: {
    type: String,
    default: "User",
    require: true,
    enum: ["Admin", "User", "ViewOnly"]
  }
});

const userModel = model('User', userSchema);

export default userModel;
