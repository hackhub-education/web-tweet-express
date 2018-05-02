const express = require('express');
const router = express.Router();

const Users = require('../models/users');
const utils = require('../utils');

router.get('/', utils.requireLogin, (req, res) => {
  res.render('profile');
});

router.get('/edit', utils.requireLogin, (req, res) => {
  res.render('editProfile');
});

// update user profile
router.post('/edit', utils.requireLogin, (req, res, next) => {
  Users.update({ _id: req.user._id }, req.body, (err) => {
    if(err) {
      return next(err);
    } else {
      return res.redirect('/profile')
    }
  });
});

// update user avatar
router.post('/avatar', utils.requireLogin, (req, res, next) => {
  Users.update({ _id: req.user._id }, req.body, (err) => {
    if(err) {
      return next(err);
    } else {
      return res.json({ success: true })
    }
  });
});

module.exports = router;