const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  location: String,
  avatarUrl: String,
  bio: String
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
