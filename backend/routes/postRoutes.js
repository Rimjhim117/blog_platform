import express from "express";
import { 
  getPosts, 
  getPostById,
  getMyPosts,
  createPost, 
  updatePost, 
  deletePost,
  toggleLikePost,
  toggleBookmarkPost,
  getBookmarkedPosts,
  getUniqueTags
} from "../controllers/postController.js"; 
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getPosts);
router.get("/tags", getUniqueTags);
router.get("/bookmarked", protect, getBookmarkedPosts);
router.get("/:id", getPostById);

// Private routes
router.get("/my-posts", protect, getMyPosts); // ADD THIS
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, toggleLikePost);
router.post("/:id/bookmark", protect, toggleBookmarkPost);

export default router;