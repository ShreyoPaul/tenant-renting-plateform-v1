import express from "express";
import {
  getBookmarks, toggleBookmark
} from "../controllers/bookmarkController.js";
import { authMiddleware } from "../utils/middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getBookmarks);
router.post("/postdata",authMiddleware,toggleBookmark)

// instead of add and delete, we can also have a toggle route that adds if not present and removes if already bookmarked
router.post("/toggle", authMiddleware, toggleBookmark);

export default router;