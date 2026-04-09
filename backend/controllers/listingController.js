// controllers/listingController.js
import Listing from "../models/Listing.js";

// CREATE a new listing
export const createListing = async (req, res) => {
  try {
    const { title, price, location, description, images, owner_name, owner_phone } = req.body;

    // Validate required fields
    if (!title || !price || !location || !owner_name || !owner_phone) {
      return res.status(400).json({
        error: "Missing required fields: title, price, location, owner_name, owner_phone"
      });
    }

    const listing = new Listing(req.body);
    await listing.save();

    res.status(201).json({
      message: "✅ Listing created successfully",
      listing
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all listings with filters
// export const getListings = async (req, res) => {
//   try {
//     const { location, maxPrice, verified ,style} = req.query;

//     let filter = {};

// filter.location = {
//   $regex: location,
//   $options: "i"
// };

//     if (maxPrice) {
//       filter.price = { $lte: parseInt(maxPrice) };
//     }

//     if (verified !== undefined) {
//       filter.verified = verified === "true";
//     }
//      if (style) {
//   const normalizedStyle = style
//     .toLowerCase()
//     .replace(/-/g, " ")
//     .trim();

//   filter.description = {
//     $regex: normalizedStyle,
//     $options: "i"
//   };
// }

//     const listings = await Listing.find(filter).sort({ createdAt: -1 });

//     res.json({
//       count: listings.length,
//       listings
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getListings = async (req, res) => {
  try {
    const { location, maxPrice, verified, style } = req.query;

    let conditions = [];

    // ✅ Location (multiple)
    if (location) {
      const locationsArray = location.split("|");

      conditions.push({
        $or: locationsArray.map((loc) => ({
          location: { $regex: loc.trim(), $options: "i" }
        }))
      });
    }

    // ✅ Price
    if (maxPrice) {
      conditions.push({
        price: { $lte: Number(maxPrice) }
      });
    }

    // ✅ Verified
    if (verified !== undefined) {
      conditions.push({
        verified: verified === "true"
      });
    }

    // ✅ Style (description)
    if (style) {
      const normalizedStyle = style
        .toLowerCase()
        .replace(/-/g, " ")
        .trim();

      conditions.push({
        description: {
          $regex: normalizedStyle,
          $options: "i"
        }
      });
    }

    // ✅ Combine all filters
    const filter = conditions.length > 0 ? { $and: conditions } : {};

    const listings = await Listing.find(filter).sort({ createdAt: -1 });

    res.json({
      count: listings.length,
      listings
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllData = async (req, res) => {
  try {
    const listings = await Listing.find();

    if (listings.length === 0) {
      return res.status(404).json({ message: "No listings found" });
    }

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET single listing by ID
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE a listing
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.json({
      message: "✅ Listing updated successfully",
      listing
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a listing
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.json({
      message: "✅ Listing deleted successfully",
      listing
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
