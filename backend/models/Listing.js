// models/Listing.js
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    sub_area: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      enum: [
        "Single",
        "2 Sharing",
        "3 Sharing",
        "4 Sharing",
        "Premium",
        "Regular",
      ],
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      required: true,
    },
    owner_name: {
      type: String,
      required: true,
      trim: true,
    },
    owner_phone: {
      type: String,
      required: true,
    },
    status: {
  type: String,
  enum: ["active", "inactive"],
  default: "active"
},

    verified: {
      type: Boolean,
      default: false,
    },
    nearbyPlaces: [
      {
        place: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        distance: {
          type: String,
        },
      },
    ],
    guidelines: [
      {
        title: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Listing", listingSchema);
