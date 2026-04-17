// routes/listingRoutes.js
import express from "express";
import multer from "multer";
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  getAllData,
  getOwnerListings,
  updateListingStatus,
  deleteOwnerListing
} from "../controllers/listingController.js";

// import { signup } from "../controllers/authController.js";

const router = express.Router();
import {authMiddleware} from "../utils/middleware.js"

const upload = multer({ storage: multer.memoryStorage() });


// Routes
router.post("/", upload.array("images", 5),authMiddleware,  createListing);          // POST /api/listings
router.get("/", getListings);              // GET /api/listings?location=jadavpur&maxPrice=7000
router.get("/getall", getAllData);
router.get("/mydata",authMiddleware,getOwnerListings);
router.get("/:id", getListingById);        // GET /api/listings/:id
router.put("/:id", updateListing);         // PUT /api/listings/:id
router.patch("/:id/status",authMiddleware, updateListingStatus);
router.delete("/:id", deleteListing);      // DELETE /api/listings/:id
// router.post("/signup", signup);
router.delete("/:id", authMiddleware, deleteOwnerListing);
export default router;
