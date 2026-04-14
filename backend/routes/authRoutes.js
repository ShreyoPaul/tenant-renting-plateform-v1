import express from "express";
import { getUser, login, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.get("/getuser",getUser)

export default router;