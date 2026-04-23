import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
// import User from "../models/User.js";
import User from "../models/User.js";
import UserData from "../models/UserData.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileFilled: false
    });

    // generate token
    // const token = jwt.sign(
    //   { id: user._id },
    //   "SECRET_KEY",
    //   { expiresIn: "7d" }
    // );
    const token=jwt.sign({ id: user._id, role: user.role, profileFilled: user.profileFilled }, "SECRET_KEY");
    console.log("data is "+token)

    res.status(201).json({
      message: "Signup successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     const userData = await UserData.findOne({ user: user._id }); // ✅ fetch profile data
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign({ id: user._id ,role:user.role, profileFilled: userData ? true : false }, "SECRET_KEY", {
//       expiresIn: "7d"
//     });

//     res.json({ token, user });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // ✅ FIRST check user
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ THEN fetch userData
    const userData = await UserData.findOne({ user: user._id });

    // ✅ check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        profileFilled: userData ? true : false
      },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (error) {
    console.error(error); // ✅ add this
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { email } = req.query;

    // ✅ check email
    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const data = await User.findOne({ email });

    // ✅ not found
    if (!data) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // ✅ success
    res.status(200).json({
      message: "User fetched successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    });
  }
};



//FORGOT PASSWORD API
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // ✅ get user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // ✅ generate token
const resetToken = crypto.randomBytes(32).toString("hex");
console.log( "Reset Token"+resetToken);

const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  console.log("Hashed Password"+ hashedToken);

user.resetPasswordToken = hashedToken; 
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  // ✅ email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
},
  });

  // ✅ send mail
  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    html: `
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `,
  });

  res.json({ message: "Reset link sent to email" });
};

//RESET PASSWORD API
export const resetPassword = async (req, res) => {
  const token = req.params.token;

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  // user.password = req.body.password;
  

user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};





// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "your@gmail.com",
//     pass: "your_app_password",
//   },
// });

// await transporter.sendMail({
//   to: user.email,
//   subject: "Password Reset",
//   html: `<p>Click below to reset:</p>
//          <a href="${resetUrl}">${resetUrl}</a>`,
// });