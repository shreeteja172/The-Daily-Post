import express from "express";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "../uploadthing.js"; 

const router = express.Router();

router.use(
  "/uploadthing/blogs",
  createRouteHandler({
    router: uploadRouter,
  })
);

export default router;