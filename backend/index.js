const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const { config } = require("dotenv");
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/", mainRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
