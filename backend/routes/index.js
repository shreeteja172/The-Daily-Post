const express = require("express");
const userRouter = require("./user");
const router = express.Router();
const blogRouter = require("./blogs");

router.use("/user", userRouter);
router.use("/blogs", blogRouter);

module.exports = router;