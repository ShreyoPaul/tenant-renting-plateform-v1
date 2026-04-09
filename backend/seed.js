// seed.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import Listing from "./models/Listing.js";

dotenv.config();

const seedData = [
  {
    title: "2-BHK PG near Jadavpur University",
    price: 5000,
    location: "Jadavpur",
    description: "2 sharing room, WiFi included, Free water & electricity",
    images: ["https://via.placeholder.com/300?text=PG+1"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Rahul Singh",
    owner_phone: "9876543210",
    verified: true,
  },
  {
    title: "Single Room PG - RP Road",
    price: 8000,
    location: "RP Road",
    description: "Single AC room with attached bathroom, food included",
    images: ["https://via.placeholder.com/300?text=PG+2"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Neha Sharma",
    owner_phone: "9123456789",
    verified: true,
  },
  {
    title: "Affordable PG - Tollygunj",
    price: 4500,
    location: "Tollygunj",
    description: "3-sharing room, Non-AC, WiFi available",
    images: ["https://via.placeholder.com/300?text=PG+3"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Vikram Patel",
    owner_phone: "8765432109",
    verified: false,
  },
  {
    title: "Premium PG - Park Street",
    price: 12000,
    location: "Park Street",
    description: "Single AC room, premium furnished, meals included",
    images: ["https://via.placeholder.com/300?text=PG+4"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Priya Gupta",
    owner_phone: "9654321098",
    verified: true,
  },
  {
    title: "Budget PG - AJC Bose Road",
    price: 3500,
    location: "AJC Bose Road",
    description: "4-sharing room, basic amenities",
    images: ["https://via.placeholder.com/300?text=PG+5"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Rajesh Kumar",
    owner_phone: "9012345678",
    verified: false,
  },
  {
    title: "Cozy Room - South Kolkata",
    price: 6500,
    location: "Ballyganj",
    description: "Double occupancy, WiFi, cooking allowed",
    images: ["https://via.placeholder.com/300?text=PG+6"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Anjali Das",
    owner_phone: "8901234567",
    verified: true,
  },
  {
    title: "Girls PG - Alipore",
    price: 7000,
    location: "Alipore",
    description: "Only for girls, 2-sharing, WiFi, security",
    images: ["https://via.placeholder.com/300?text=PG+7"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Mrs. Sharma",
    owner_phone: "9234567890",
    verified: true,
  },
  {
    title: "Boys Hostel - Kalighat",
    price: 5500,
    location: "Kalighat",
    description: "2-sharing room, mess included, WiFi, gym",
    images: ["https://via.placeholder.com/300?text=PG+8"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Suresh Singh",
    owner_phone: "8567890123",
    verified: false,
  },
  {
    title: "Modern PG - Bally",
    price: 9000,
    location: "Bally",
    description: "Single room, fully furnished, AC, WiFi",
    images: ["https://via.placeholder.com/300?text=PG+9"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Deepak Verma",
    owner_phone: "9456789012",
    verified: true,
  },
  {
    title: "Luxury PG - Salt Lake",
    price: 15000,
    location: "Salt Lake",
    description: "Premium single room, WiFi, gym, parking",
    images: ["https://via.placeholder.com/300?text=PG+10"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Sandeep Malhotra",
    owner_phone: "8234567890",
    verified: true,
  },
  {
    title: "Mid-Range PG - Behala",
    price: 4800,
    location: "Behala",
    description: "2-sharing, WiFi, water & electricity included",
    images: ["https://via.placeholder.com/300?text=PG+11"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Mohan Das",
    owner_phone: "9345678901",
    verified: false,
  },
  {
    title: "Spacious Room - Howrah",
    price: 6000,
    location: "Howrah",
    description: "Double room, near railway station, WiFi",
    images: ["https://via.placeholder.com/300?text=PG+12"],
    amenities: [
      "📶Gigabit Wi-Fi",
      "❄️Full AC",
      "🧺Laundry Service",
      "🛡24/7 Security",
    ],
    owner_name: "Arjun Singh",
    owner_phone: "8456789012",
    verified: true,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing listings
    await Listing.deleteMany({});
    console.log("🗑️  Cleared existing listings");

    // Insert seed data
    const result = await Listing.insertMany(seedData);
    console.log(`✅ Inserted ${result.length} listings into database`);

    console.log("\n📊 Sample IDs:");
    result.forEach((listing, index) => {
      console.log(`${index + 1}. ${listing.title} - ID: ${listing._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
