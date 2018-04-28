const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

/**
 * middleware
 * note: middleware is running in sequence, from top to bottom
 */
app.use(logger('dev')); // log requests in server console
app.use(bodyParser.json()); // parse client request data to json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World!'));

// return file content
app.get('/:filename', (req, res) => {
  fs.readFile(req.params.filename, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data)
    }
  });
});

// create file
app.post('/:filename', (req, res) => {
  fs.writeFile(req.params.filename, req.body.content, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('success')
    }
  });
});

// update file
app.put('/:filename', (req, res) => {
  fs.appendFile(req.params.filename, req.body.content, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('success')
    }
  });
});

// delete file
app.delete('/:filename', (req, res) => {
  fs.unlink(req.params.filename, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('success')
    }
  });
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