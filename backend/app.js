// app.js
import express from "express";
import cors from "cors";
import listingRoutes from "./routes/listingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import userdataRoutes from "./routes/userdataRoutes.js"
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/listings", listingRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/user", userdataRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is running" });
});

export default app;
