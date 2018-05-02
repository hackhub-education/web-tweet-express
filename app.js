const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const Tweets = require('./models/tweets');

// connect mongoDB
mongoose.connect('mongodb://localhost:27017/webdxd');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * middleware
 * note: middleware is running in sequence, from top to bottom
 */
app.use(bodyParser.json()); // parse client request data to json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev')); // log requests in server console
/**
 * you need to use session middleware to create session store
 * if you want to use passport session
*/
app.use(session({
  secret: 'webdxd',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // only set this to true if you are in HTTPS connection
}));

app.use(passport.initialize());
app.use(passport.session());

// passport config
require('./passport');
/**
 * set local variables, so you can use it in template engine
 */
app.locals.moment = require('moment');

/** custom middleware automatically adding user into templates */
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use((req, res, next) => {
  const query = req.originalUrl.includes('/profile') ? { author: req.user._id } : {};
  Tweets.find(query, (err, tweets) => {
    res.locals.tweets = tweets;
    next();
  }).populate('author').sort({createdAt: -1 })
});

// import routers
const index = require('./routes/index');
const profile = require('./routes/profile');
const tweet = require('./routes/tweet');

// apply router middleware
app.use('/', index);
app.use('/profile', profile);
app.use('/tweet', tweet);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err =  new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  res.send(err.message);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, ()=>{
  console.log(`Server running on http://localhost:${port}`)
});