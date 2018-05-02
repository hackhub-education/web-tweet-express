const express = require('express');
const router = express.Router();

const tweets = require('../tweets');
const utils = require('../utils');

router.get('/', utils.requireLogin, (req, res) => {
  res.render('profile');
});

router.get('/edit', utils.requireLogin, (req, res) => {
  res.render('editProfile');
});

module.exports = router;