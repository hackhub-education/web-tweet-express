const express = require('express');
const router = express.Router();
const tweets = require('../tweets');

// -> GET /profile
router.get('/', (req, res) => {
  res.render('profile');
});

// -> GET /profile/edit
router.get('/edit', (req, res) => {
  res.render('editProfile');
});

module.exports = router;