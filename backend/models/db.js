import mongoose from "mongoose";
import config from "../config.js";
import bcrypt from "bcrypt";

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password_hash: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

UserSchema.methods.createHash = async function (plainTextPassword) {
  const saltRounds = 10;

  //   const salt = await bcrypt.genSalt(saltRounds);
  //   return await bcrypt.hash(plainTextPassword, salt);

  return await bcrypt.hash(plainTextPassword, saltRounds);
};

UserSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password_hash);
};

const User = mongoose.model("User", UserSchema);

//blog keliye schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true},
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export { User, Blog };
