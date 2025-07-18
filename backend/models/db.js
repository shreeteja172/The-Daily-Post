const mongoose = require("mongoose");
const config = require("../config");

const bcrypt = require("bcrypt");
const { refine } = require("zod");
const { required } = require("zod/mini");

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

module.exports = {
  User,
};
