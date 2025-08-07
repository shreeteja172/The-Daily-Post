import express from "express";
import { Blog } from "../models/db.js";
import { authMiddleware } from "../middlewares/auth.js";
import z from "zod";
import asyncHandler from "express-async-handler";

const router = express.Router();

const createBlogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(5),
  date: z.string().datetime().optional(),
  visibility: z.enum(["public", "private"]).optional().default("public"),
  imageUrl: z.string().url().optional().default(""),
});

router.post(
  "/createblogs",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // console.log("Request body:", req.body);
    // console.log("User ID from auth:", req.userid);

    try {
      const parsed = createBlogSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid input",
        });
      }
      const { title,description, content, date, visibility, imageUrl } = parsed.data;
      //   console.log("Parsed data:", parsed.data);
      const authorId = req.userid;

      const newBlog = new Blog({
        title,
        description,
        content,
        date: date || new Date().toISOString(),
        visibility: visibility || "public",
        imageUrl: imageUrl || "",
      });
      // console.log("New blog data:", newBlog);
      newBlog.author = authorId;
      const savedBlog = await newBlog.save();
      await savedBlog.populate("author", "username email");
      res.status(201).json({
        message: "Blog created successfully",
        blog: savedBlog,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    try {
      // Include blogs that are public OR don't have visibility field (old blogs)
      const blogs = await Blog.find({
        $or: [{ visibility: "public" }, { visibility: { $exists: false } }],
      })
        .populate("author", "username email")
        .sort({ createdAt: -1 });

      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

router.get(
  "/getAllBlogs",
  authMiddleware,
  asyncHandler(async (req, res) => {
    try {
      const userId = req.userid;

      const blogs = await Blog.find({
        $and: [
          { author: { $ne: userId } },
          {
            $or: [{ visibility: "public" }, { visibility: { $exists: false } }],
          },
        ],
      })
        .populate("author", "username email")
        .sort({ createdAt: -1 });

      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

router.get(
  "/myBlogs",
  authMiddleware,
  asyncHandler(async (req, res) => {
    try {
      const userId = req.userid;

      const blogs = await Blog.find({ author: userId })
        .populate("author", "username email")
        .sort({ createdAt: -1 });

      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching user's blogs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

router.get(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // console.log(req.params.id);
    const blogId = req.params.id;
    const userId = req.userid;

    try {
      const blog = await Blog.findById(blogId).populate(
        "author",
        "username email"
      );
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (blog.visibility === "private") {
        if (blog.author._id.toString() !== userId) {
          return res
            .status(403)
            .json({ message: "Access denied. This is a private blog." });
        }
      }

      res.status(200).json(blog);
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userid;
    // console.log("User ID from middleware:", userId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const blogId = req.params.id;
    try {
      const blog = await Blog.findByIdAndDelete(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
      }
      res.status(200).json({ message: "Blog Deleted Successfully" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

router.put(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.userid;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const blogId = req.params.id;
    try {
      const parsed = createBlogSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid input",
        });
      }
      const { title,description, content, date, visibility, imageUrl } = parsed.data;
      // console.log("Parsed data for update:", parsed.data);
      const updateData = { title, content };
      if (date) {
        updateData.date = date;
      }
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }
      if (visibility) {
        updateData.visibility = visibility;
      }
      if (description) {
        updateData.description = description;
      }
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
        new: true,
      }).populate("author", "username email");
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json({
        message: "Blog updated successfully",
        blog: updatedBlog,
      });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
export default router;