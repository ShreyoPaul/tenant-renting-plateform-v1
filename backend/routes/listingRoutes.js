// routes/listingRoutes.js
import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  getAllData
} from "../controllers/listingController.js";
// import { signup } from "../controllers/authController.js";

const router = express.Router();

// Routes
router.post("/", createListing);           // POST /api/listings
router.get("/", getListings);              // GET /api/listings?location=jadavpur&maxPrice=7000
router.get("/getall", getAllData);
router.get("/:id", getListingById);        // GET /api/listings/:id

router.put("/:id", updateListing);         // PUT /api/listings/:id
router.delete("/:id", deleteListing);      // DELETE /api/listings/:id
// router.post("/signup", signup);
export default router;
