const express = require('express');
const router = express.Router();
const Tweets = require('../models/tweets');

router.get('/', (req, res) => {
  Tweets.find({}, (err, tweets) => {
    res.render('index', { tweets });
  })
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;