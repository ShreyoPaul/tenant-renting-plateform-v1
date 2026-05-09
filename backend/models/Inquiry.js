// models/Inquiry.js

import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    type: {
      type: String,
      enum: ["whatsapp", "call"],
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);