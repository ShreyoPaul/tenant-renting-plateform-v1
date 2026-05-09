import express from "express";
import {
  trackCallClick,
  trackWhatsappClick,
} from "../controllers/inquiryController.js";

import { authMiddleware } from "../utils/middleware.js";

const router = express.Router();

router.post("/track-whatsapp", authMiddleware, trackWhatsappClick);

router.post("/track-call", authMiddleware, trackCallClick);

export default router;