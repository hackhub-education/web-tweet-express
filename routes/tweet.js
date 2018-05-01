const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});

module.exports = router;