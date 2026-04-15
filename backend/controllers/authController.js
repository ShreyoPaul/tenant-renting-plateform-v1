import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
    });

    // generate token
    // const token = jwt.sign(
    //   { id: user._id },
    //   "SECRET_KEY",
    //   { expiresIn: "7d" }
    // );
    const token=jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY");
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



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id ,role:user.role}, "SECRET_KEY", {
      expiresIn: "7d"
    });

    res.json({ token, user });

  } catch (error) {
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