const express = require('express');
const passport = require('passport');
const Tweets = require('../models/tweets');

const router = express.Router();

// get all tweets
router.get('/', (req, res) => {
  Tweets.find({}, (err, tweets) => {
    if (err) {
      return res.json({ error: err, success: false })
    }
    return res.json({ tweets, error: null, success: true })
  })
});

// accept post tweet with token
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const tweet = new Tweets({ ...req.body, author: req.user._id });
  tweet.save((err, doc) => {
    if (err) {
      return res.json({ error: err, success: false })
    }
    return res.json({ tweet: doc, error: null, success: true });
  });
});

module.exports = router;