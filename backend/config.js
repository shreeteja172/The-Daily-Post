import path from "path";
import dotenv from "dotenv";
dotenv.config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  BACKEND_URL: process.env.BACKEND_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export default config;
export const MONGO_URL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const BACKEND_URL = process.env.BACKEND_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
