import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/db.js";
import { z } from "zod";
import asyncHandler from "express-async-handler";
import config from "../config.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
const { JWT_SECRET } = config;

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post(
  "/auth/register",
  asyncHandler(async (req, res) => {
    try {
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid input",
        });
      }
      const { username, email, password, firstName, lastName } = parsed.data;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Usernamew already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password_hash: hashedPassword,
        firstName,
        lastName,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);

      res.status(201).json({
        message: "User registered successfully",
        userId: savedUser._id,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  })
);

router.post(
  "/auth/login",
  asyncHandler(async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  })
);

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.userid;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password_hash");
    //yaad rakh .select("-password_hash") ko use karte hain taaki password-hash return na ho
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/profile", authMiddleware, async (req, res) => {
  const userId = req.userid;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const parsed = updateBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }
  const { password, firstName, lastName, profileImage } = parsed.data;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(password, salt);
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (profileImage) user.profileImage = profileImage;

    const updatedUser = await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/profile", authMiddleware, async (req, res) => {
  const userId = req.userid;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
