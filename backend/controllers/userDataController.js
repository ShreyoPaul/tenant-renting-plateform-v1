import UserData from "../models/UserData.js";

// export const saveUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const {
//       fullName,
//       universityName,
//       passoutYear,
//       dob,
//       budget,
//       preferredLocation,
//       profileImg
//     } = req.body;
// if (!fullName || !universityName ||!passoutYear|| !dob||!budget || !preferredLocation || !profileImg) {
//   return res.status(400).json({ message: "All fields are required is required" });
// }
//     // 🔹 Upsert (create if not exist, else update)
//     const userProfile = await UserData.findOneAndUpdate(
//       { user: userId },
//       {
//         user: userId,
//         fullName,
//         universityName,
//         passoutYear,
//         dob,
//         budget,
//         preferredLocation,
//         profileImg
//       },
//       {
//         new: true,        // return updated doc
//         upsert: true      // create if not exists
//       }
//     );

//     res.status(200).json({
//       message: "Profile saved successfully",
//       data: userProfile
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Error saving profile",
//       error: error.message
//     });
//   }
// };


import cloudinary from "../config/cloudinary.js"; // same as listing
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

export const saveUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let {
      fullName,
      universityName,
      passoutYear,
      dob,
      budget,
      preferredLocation
    } = req.body;

    // ✅ validation (remove profileImg from here)
    if (!fullName || !universityName || !passoutYear || !dob || !budget || !preferredLocation) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    let imageUrl = "";

    // 🔥 Upload avatar to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      console.log("Cloudinary avatar upload:", result);

      imageUrl = result.secure_url;
    }

    // 🔥 Upsert profile
    const userProfile = await UserData.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        fullName,
        universityName,
        passoutYear,
        dob,
        budget,
        preferredLocation,
        ...(imageUrl && { profileImg: imageUrl }) // ✅ only update if exists
      },
      {
        new: true,
        upsert: true
      }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      data: userProfile
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving profile",
      error: error.message
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ correct

    const data = await UserData.findOne({ user: userId }); // ✅ correct query

    if (!data) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message
    });
  }
};