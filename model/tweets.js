const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  imageUrl: String,
  author: {
    name: { type: String, required: true },
    username: { type: String, required: true },
    location: String,
    avatarUrl: String,
    bio: String
  },
  createdAt: {type: Date, required: true, default: Date.now()}
});

const Tweet = new mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
