import User from "../models/User.js";
import Listing from "../models/Listing.js";

export const toggleBookmark = async (req, res) => {
    try {
        const { listingId } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isBookmarked = user.bookmarks.includes(listingId);
        if (isBookmarked) {
            user.bookmarks.pull(listingId);
        } else {
            user.bookmarks.push(listingId);
        }

        await user.save();

        res.json({
            message: isBookmarked ? "Bookmark removed" : "Bookmark added",
            bookmarks: user.bookmarks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
};

export const getBookmarks = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("bookmarks"); // What populate does is it replaces the listing IDs in bookmarks with the actual listing documents from the Listing collection. This way, when we return the bookmarks to the frontend, we get all the details of each bookmarked listing instead of just their IDs.
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ bookmarks: user.bookmarks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
};