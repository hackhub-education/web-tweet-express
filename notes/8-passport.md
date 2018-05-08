# Course Instructions 8-passport

## User authentication using passport
- Install the following packages
```
npm install --save passport passport-local passport-local-mongoose express-session 
```
- In `models/users.js`
  - Require `passport-local-mongoose`
  ```
  const passportLocalMongoose = require('passport-local-mongoose');
  ```
  - Apply plugin to schema
  ```
  UsersSchema.plugin(passportLocalMongoose);
  ```
- In `app.js`
  - Require modules
  ```
  const passport = require('passport');
  const session = require('express-session');
  const LocalStrategy = require('passport-local').Strategy;
  const Users = require('./models/users');
  ```
  - Apply session middleware
  ```
  app.use(session({
    secret: 'webdxd',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));
  ```
  - Apply passport middleware
  ```
  app.use(passport.initialize());
  app.use(passport.session());
  ```
  - Config passport middleware
  ```
  passport.use(Users.createStrategy());
  passport.serializeUser(Users.serializeUser());
  passport.deserializeUser(Users.deserializeUser()); 
  ```
- In `views/login.pug`, change the login form to
```
form(action="/login" method="POST")
  input.input-auth(type="text" name="username" placeholder="Username" required="")
  input.input-auth(type="password" name="password" placeholder="Password" required="")
  button.btn-primary Log in
```
- In `views/signup.pug`, change the sign form to
```
form(action="/signup" method="POST")
  input.input-auth(type="text" name="username" placeholder="Username" required="")
  input.input-auth(type="password" name="password" placeholder="Password" required="")
  input.input-auth(type="password" name="confirmPassword" placeholder="Repeat password" required="")
  button.btn-primary Sign up
```
**Note:** Only form elements with a name attribute will have their values passed when submitting a form.
- The `body-parser` middleware will convert the data passed from form into a JSON object, and then add the object as `req.body` in request.
- In `views/profile.pug`, change the log out to
```
a.btn-border.space-top(href="/logout") Log out
```
- In `routes/index.js`
  - Require following modules
  ```
  const passport = require('passport');
  const Users = require('../models/users');
  ```
  - Add signup and login api
  ```
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
  });

  router.post('/signup', (req, res, next) => {
    const { username, password, confirmPassword } = req.body;
    if (password === confirmPassword) {
      Users.register(new Users({ username, name: username }), password, (err, user) => {
        if (err) {
          return next(err)
        }
    
        passport.authenticate('local')(req, res, () => {
          return res.redirect('/');
        });
      });
    } else {
      return next({ message: 'Password does not match' })
    }
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
  ```
- Create `utils.js` in project root.
```
web-tweet-express
├── app.js          #express entry file
├── views           #all view files
├── public          #static assets
├── routes          #express router modules
├── models          #Mongoose models
├── utils.js        #utility functions  
├── tweets.json     #tweets data
└── package.json    #project information and dependencies
```
- In `utils.js`, add the following code to redirect unauthorized users to login page
```
exports.requireLogin = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect('/login');
};
```
- Use the `requireLogin` function as the middleware for each route that need user login
```
const utils = require('../utils');

router.get('/', utils.requireLogin, (req, res) => {
  res.render('profile');
});

router.get('/edit', utils.requireLogin, (req, res) => {
   res.render('editProfile');
 });
```
- After the user is authenticated, passport will add the user profile into `request` object as `req.user`. We can pass user profile to pug using middleware
- In `app.js`, add the following code before routers.
```
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
```
