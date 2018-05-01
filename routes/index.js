const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Users = require('../models/users');
const Tweets = require('../models/tweets');

router.get('/', (req, res) => {
  console.log(req.user);
  Tweets.find({}, (err, tweets) => {
    res.render('index', { tweets });
  })
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err !== null || !user) {
      return res.json({
        message: 'Something went wrong',
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.json(err);
      }
      // generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign({ id: user._id }, 'webdxd_token');
      return res.json({ user, token });
    });
  })(req, res);
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  Users.register(new Users({ username, name: username }), password, (err) => {
    if (err) {
      return next(err);
    }

    passport.authenticate('local', { session: false }, (err, user) => {
      if (err !== null || !user) {
        return res.json({
          message: 'Something went wrong',
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.json(err);
        }
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign({ id: user._id }, 'webdxd_token');
        return res.json({ user, token });
      });
    })(req, res);
  });
})

module.exports = router;