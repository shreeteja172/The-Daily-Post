import express from "express";
import userRouter from "./user.js";
import blogRouter from "./blogs.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/blogs", blogRouter);

export default router;
