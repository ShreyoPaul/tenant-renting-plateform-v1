// controllers/listingController.js
import cloudinary from "../config/cloudinary.js";
import Listing from "../models/Listing.js";
import streamifier from "streamifier";


const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "room-listings" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// CREATE a new listing
export const createListing = async (req, res) => {
  try {
    // try {
    //   const test = await cloudinary.uploader.upload(
    //     "https://picsum.photos/200/300"
    //   );
    //   console.log(test);
    // } catch (err) {
    //   console.error("Cloudinary direct upload error:", err);
    // }

    let { title, price, location, owner_name, owner_phone, amenities, tags } = req.body;

    // Parse location into area and sub_area
    const locationParts = location.split(', ');
    const area = locationParts[0].trim();
    const sub_area = locationParts[1] ? locationParts[1].trim() : null;

    // Image file validation (must have one image)
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: "At least one image is required"
      });
    }

    // Validation
    if (!title || !price || !location || !owner_name || !owner_phone || !amenities || !tags) {
      return res.status(400).json({
        error: "Missing required fields or invalid data"
      });
    }

    price = parseInt(price);

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    const parsedTags = typeof tags === "string"
      ? tags.split(",").map(t => t.trim())
      : tags;

    const parsedAmenities = typeof amenities === "string"
      ? amenities.split(",").map(a => a.trim())
      : amenities;

    if (!parsedTags || parsedTags.length === 0)
      return res.status(400).json({ error: "At least one tag is required" });

    if (!parsedAmenities || parsedAmenities.length === 0)
      return res.status(400).json({ error: "At least one amenity is required" });


    // 🔥 Upload images
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploads = req.files.map(file =>
        uploadToCloudinary(file.buffer)
      );

      const results = await Promise.all(uploads);

      console.log("Cloudinary upload results:", results);

      imageUrls = results.map(r => r.secure_url);

      // imageUrls = results.map(r => ({
      //   url: r.secure_url,
      //   public_id: r.public_id
      // }));
    }

    // ✅ Create listing with images
    const listing = new Listing({
      title,
      price,
      location,
      area,
      sub_area,
      owner_name,
      owner_phone,
      amenities: parsedAmenities,
      tags: parsedTags,
      images: imageUrls
    });


    await listing.save();
    res.status(201).json({
      message: "✅ Listing created successfully",
      listing
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Sample listing:
// {
//   "title": "2-BHK PG near Jadavpur University",
//   "price": 5000,
//   "location": "Jadavpur",
//   "description": "2 sharing room, WiFi included, Free water & electricity",
//   "tags": "2 sharing, regular",
//   "images": ["https://via.placeholder.com/300?text=PG+1"],
//   "amenities": "📶Gigabit Wi-Fi, ❄️Full AC, 🧺Laundry Service, 🛡24/7 Security ",
//   "owner_name": "Rahul Singh",
//   "owner_phone": "9876543210",
//   "verified": false
// }

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
    const { location, maxPrice, verified, style, roomStyle } = req.query;
    console.log("Received query parameters:", req.query);

    let conditions = [];

    // ✅ Location (multiple) - now checks area or sub_area
    if (location) {
      const locationsArray = location.split("|");

      conditions.push({
        $or: locationsArray.map((loc) => ({
          $or: [
            { area: { $regex: loc.trim(), $options: "i" } },
            { sub_area: { $regex: loc.trim(), $options: "i" } },
            { location: { $regex: loc.trim(), $options: "i" } } // fallback
          ]
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

    // ✅ Style & Room Style (description)
    if (style) {
      console.log("Filtering by style and roomStyle:", { style, roomStyle });
      const normalizedStyle = style
        .toLowerCase()
        .replace(/-/g, " ") // eg: "2-sharing" -> "2 sharing"
        .trim();

        console.log("Normalized style:", normalizedStyle);

      const normalizedRoomStyle = roomStyle != undefined ? roomStyle
        .toLowerCase()
        .replace(/-/g, " ")
        .trim() : undefined; // if roomStyle is empty, it will be falsy and we won't filter by it. else if roomStyle is provided, we normalize it and include it in the filter. includes premium, regular

        console.log("Normalized roomStyle:", normalizedRoomStyle);

        let descriptionFilter = [roomStyle]
        if (normalizedStyle) {
          descriptionFilter.push(normalizedStyle);
        }


      conditions.push({
        tags: {
          $all: descriptionFilter.map((s) => new RegExp(s, "i"))
        }
      });
    }

    // ✅ Combine all filters
    const filter = conditions.length > 0 ? { $and: conditions } : {};
    console.log("Constructed filter:", JSON.stringify(filter, null, 2));

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
