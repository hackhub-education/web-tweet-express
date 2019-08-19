const express = require('express');
const router = express.Router();
const tweets = require('../tweets');

const User = require("../model/users");

router.get('/', (req, res) => {
  res.render('index', { tweets });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/createNewUser', (req, res) => {
  const newUser = new User({
    name: "Ethan",
    username: "ethan",
    location: "vancouver",
    avatarUrl: "test",
    bio: "Test"
  })

  newUser.save((err, doc) => {
    if (err) {
      console.log(err);
    } {
      res.send(doc)
    }
  })
})

module.exports = router;