const express = require('express');
const router = express.Router();
const tweets = require('../tweets');

router.get('/', (req, res) => {
  res.render('profile');
});

router.get('/edit', (req, res) => {
  res.render('editProfile');
});

module.exports = router;