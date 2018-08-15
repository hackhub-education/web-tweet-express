const express = require('express');
const passport = require('passport');
const Users = require('../models/users');

const router = express.Router();

// get user profile
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate('tweets');
    res.json({ profile: user, err: null, success: true });
  } catch (err) {
    return res.json({ error: err, success: false })
  }
});

// update user profile
router.put('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true }).populate('tweets');
    res.json({ profile: user, err: null, success: true });
  } catch (err) {
    return res.json({ error: err, success: false })
  }
});

module.exports = router;