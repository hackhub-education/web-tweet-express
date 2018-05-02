const express = require('express');
const passport = require('passport');

const Tweets = require('../models/tweets');
const utils = require('../utils');

const router = express.Router();

// accept post tweet with token
router.post('/', utils.requireLogin, async (req, res, next) => {
  try {
    const tweet = new Tweets({ ...req.body, author: req.user._id });
    const doc = await tweet.save();
    // save the tweet id to user profile
    req.user.tweets.push(doc._id);
    await req.user.save();

    return res.json({ success: true });
  } catch (err) {
    return next(err)
  }
});

// accept post tweet with token
router.delete('/:id', utils.requireLogin, async (req, res, next) => {
  try {
    const doc = await Tweets.findById(req.params.id);
    if(String(doc.author) === String(req.user._id)) {
      await Tweets.remove({ _id: req.params.id })
      return res.json({ success: true });
    } else {
      return next({ message: 'Can only delete your tweet' });
    }
  } catch (err) {
    return next(err)
  }
});

module.exports = router;