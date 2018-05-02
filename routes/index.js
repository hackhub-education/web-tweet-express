const express = require('express');
const passport = require('passport');

const router = express.Router();
const Tweets = require('../models/tweets');
const Users = require('../models/users');
const utils = require('../utils');

router.get('/', utils.requireLogin, (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    Users.register(new Users({ username, name: username }), password, (err, user) => {
      if (err) {
        return next(err)
      }
  
      passport.authenticate('local')(req, res, () => {
        return res.redirect('/');
      });
    });
  } else {
    return next({ message: 'Password does not match' })
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;