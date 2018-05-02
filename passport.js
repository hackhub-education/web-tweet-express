const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const Users = require('./models/users');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(Users.createStrategy());

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'webdxd_token'
}, (jwtPayload, cb) => {
  return Users.findById(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
  }
));
