const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('profile');
});

router.get('/edit', (req, res) => {
  res.render('editProfile');
});

module.exports = router;