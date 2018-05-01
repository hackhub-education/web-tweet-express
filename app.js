const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to WebDxD !'})
});

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