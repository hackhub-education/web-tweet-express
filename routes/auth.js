const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const _ = require('lodash');

const Users = require('../models/users');
const Tweets = require('../models/tweets');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err !== null || !user) {
      return res.json({ error: err, success: false });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.json({ error: err, success: false });
      }
      // generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign({ id: user._id }, 'webdxd_token');
      return res.json({ profile: _.omit(user.toObject(), ['salt', 'hash']), token, err: null, success: true });
    });
  })(req, res);
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  Users.register(new Users({ username, name: username }), password, (err) => {
    if (err) {
      return res.json({ error: err, success: false });
    }

    passport.authenticate('local', { session: false }, (err, user) => {
      if (err !== null || !user) {
        return res.json({ error: err, success: false });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.json({ error: err, success: false });
        }
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign({ id: user._id }, 'webdxd_token');
        return res.json({ profile: _.omit(user.toObject(), ['salt', 'hash']), token, error: null, success: true });
      });
    })(req, res);
  });
})

module.exports = router;