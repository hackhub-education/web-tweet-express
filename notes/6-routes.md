# Course Instructions 6-routes

## Using routing middleware
- Create `routes` folder in your project root, and two files inside `routes` folder
```
web-tweet-express
├── app.js          #express entry file
├── views           #all view files
├── public          #static assets
├── routes          #express router modules
│   ├── index.js
│   └── profile.js
├── tweets.json     #tweets data
└── package.json    #project information and dependencies
```
- In `index.js`, add the following code
```
const express = require('express');
const router = express.Router();
const tweets = require('../tweets');

router.get('/', (req, res) => {
  res.render('index', { tweets });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
```
- In `profile.js`, add the following code
```
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('profile');
});

router.get('/edit', (req, res) => {
  res.render('editProfile');
});

module.exports = router;
```
- In `app.js`, **Replace** the following code
  ```
  app.get('/', (req, res) => {
    res.render('index', { tweets })
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/profile', (req, res) => {
    res.render('profile');
  });

  app.get('/profile/edit', (req, res) => {
    res.render('editProfile');
  });
  ```
  with
  ```
  const index = require('./routes/index');
  const profile = require('./routes/profile');

  app.use('/', index);
  app.use('/profile', profile);
  ```