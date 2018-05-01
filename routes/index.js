const express = require('express');
const router = express.Router();
const tweets = require('../tweets');

router.get('/', (req, res) => {
  res.render('index', { tweets });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;