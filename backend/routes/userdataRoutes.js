import express from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
import { saveUserProfile ,getUserProfile} from "../controllers/userDataController.js";
import { authMiddleware } from "../utils/middleware.js";


const router = express.Router();

// router.post("/profile", authMiddleware, saveUserProfile);
router.post("/profile", authMiddleware, upload.single("profileImg"), saveUserProfile); //why upload?
router.get("/profile", authMiddleware, getUserProfile);

export default router;