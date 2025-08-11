import express from "express";
import mainRouter from "./routes/index.js";
import cors from "cors";
import { config } from "dotenv";
import uploadthingRoutes from "./routes/uploadthingRoutes.js";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/", mainRouter);
app.use("/api/", uploadthingRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
