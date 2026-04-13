import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String, // student / owner
  bookmarks: [
    // listing IDs
    { type: mongoose.Schema.Types.ObjectId, ref: "Listing" }
  ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);