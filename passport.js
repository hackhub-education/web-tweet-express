const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users');

passport.use(Users.createStrategy());

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());