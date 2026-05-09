import Inquiry from "../models/Inquiry.js";
import Listing from "../models/Listing.js";

export const trackWhatsappClick = async (req, res) => {
  try {
    const { listingId } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    await Inquiry.create({
      listingId,
      ownerId: listing.owner,
      studentId: req.user.id,
      type: "whatsapp",
    });

    res.status(200).json({
      success: true,
      phone: listing.owner_phone,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const trackCallClick = async (req, res) => {
  try {
    const { listingId } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    await Inquiry.create({
      listingId,
      ownerId: listing.owner,
      studentId: req.user.id,
      type: "call",
    });

    res.status(200).json({
      success: true,
      phone: listing.owner_phone,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};