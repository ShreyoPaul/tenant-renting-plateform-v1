import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  profileImg: String,

  fullName: {
    type: String,
    required: true
  },

  universityName: String,

  passoutYear: Number,

  dob: Date,

  budget: Number,

  preferredLocation: String

}, { timestamps: true });
const UserData = mongoose.model("UserData", userDataSchema);

export default UserData; 