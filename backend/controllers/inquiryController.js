import Inquiry from "../models/Inquiry.js";
import Listing from "../models/Listing.js";

// export const trackWhatsappClick = async (req, res) => {
//   try {
//     const { listingId } = req.body;

//     const listing = await Listing.findById(listingId);

//     if (!listing) {
//       return res.status(404).json({
//         message: "Listing not found",
//       });
//     }

//     await Inquiry.create({
//       listingId,
//       ownerId: listing.owner,
//       studentId: req.user.id,
//       type: "whatsapp",
//     });

//     res.status(200).json({
//       success: true,
//       phone: listing.owner_phone,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const trackCallClick = async (req, res) => {
//   try {
//     const { listingId } = req.body;

//     const listing = await Listing.findById(listingId);

//     if (!listing) {
//       return res.status(404).json({
//         message: "Listing not found",
//       });
//     }

//     await Inquiry.create({
//       listingId,
//       ownerId: listing.owner,
//       studentId: req.user.id,
//       type: "call",
//     });

//     res.status(200).json({
//       success: true,
//       phone: listing.owner_phone,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const trackWhatsappClick = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { listingId } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const ownerId = listing.owner;

    // ✅ check existing inquiry
    let inquiry = await Inquiry.findOne({
      listingId,
      ownerId,
      studentId,
      type: "whatsapp",
    });

    if (inquiry) {
      inquiry.count += 1;
      await inquiry.save();
    } else {
      inquiry = await Inquiry.create({
        listingId,
        ownerId,
        studentId,
        type: "whatsapp",
        count: 1,
      });
    }

    res.status(200).json({
      message: "Whatsapp click tracked",
      inquiry,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const trackCallClick = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { listingId } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const ownerId = listing.owner;

    // ✅ check existing inquiry
    let inquiry = await Inquiry.findOne({
      listingId,
      ownerId,
      studentId,
      type: "call",
    });

    if (inquiry) {
      inquiry.count += 1;
      await inquiry.save();
    } else {
      inquiry = await Inquiry.create({
        listingId,
        ownerId,
        studentId,
        type: "call",
        count: 1,
      });
    }

    res.status(200).json({
      message: "Call click tracked",
      inquiry,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};