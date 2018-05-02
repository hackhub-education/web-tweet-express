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
router.post('/:id', utils.requireLogin, (req, res) => {
  Users.update({ _id: req.params.id }, req.body, (err) => {
    if(err) {
      return next(err);
    } else {
      return res.redirect('/profile')
    }
  });
});

module.exports = router;