const express = require('express');
const passport = require('passport');
const Tweets = require('../models/tweets');

const router = express.Router();

// get all tweets
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweets.find({});
    return res.json({ tweets, error: null, success: true })
  } catch (err) {
    return res.json({ error: err, success: false })
  }
});

// accept post tweet with token
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const tweet = new Tweets({ ...req.body, author: req.user._id });
    const doc = await tweet.save();
    // save the tweet id to user profile
    req.user.tweets.push(doc._id);
    await req.user.save();

    return res.json({ tweet: doc, error: null, success: true });
  } catch (err) {
    return res.json({ error: err, success: false })
  }
});

// accept post tweet with token
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const doc = await Tweets.findById(req.params.id);
    if(String(doc.author) === String(req.user._id)) {
      await Tweets.remove({ _id: req.params.id })
      return res.json({ error: null, success: true });
    } else {
      return res.json({ error: { message: 'Can only delete your tweet' }, success: false })
    }
  } catch (err) {
    res.json({ error: err, success: false })
  }
});

module.exports = router;