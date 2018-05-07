# Course Instructions 4-views

## Epxress view engine
- Create `public` folder in the root folder, The current file structure should be as follow:
```
web-tweet-express
├── app.js          #express entry file
├── public          #static assets
└── package.json    #project information and dependencies
```
- Copy the `css`,`img`, and `webfonts` folders from `web-tweet-static` project to the `public` folder.
```
web-tweet-express
├── app.js          #express entry file
├── public          #static assets
│   ├── css
│   ├── img
│   └── webfonts
└── package.json    #project information and dependencies
```
- In `app.js`, set `public` folder as the folder to store static assets like css files and images
```
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// add this line before logger to prevent logging all static file loading
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
```
- Create `views` folder in the root folder, and delete `index.html`. The current file structure should be as follow:
```
web-tweet-express
├── app.js          #express entry file
├── views           #all view files
├── public          #static assets
│   ├── css
│   ├── img
│   └── webfonts
└── package.json    #project information and dependencies
```
- In `app.js`, before Application-level middleware
  - Set `views` folder to store all view files(`.pug`)
  ```
  app.set('views', path.join(__dirname, 'views'));
  ```
  - Set `pug` as the view engine
  ```
  app.set('view engine', 'pug');
  ```
- Create following files inside `views` folder
```
web-tweet-express
├── app.js          #express entry file
├── views           #all view files
│   ├── layout.pug
│   ├── index.pug
│   ├── nav.pug
│   ├── login.pug
│   ├── signup.pug
│   ├── profile.pug
│   └── editProfile.pug
├── public          #static assets
│   ├── css
│   ├── img
│   └── webfonts
└── package.json    #project information and dependencies
```
- In `layout.pug` we will have the global layout of each file, for example, the `<head>` tag.
```
doctype html
html
  head
    meta(charset="UTF-8")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible" content="ie=edge")
    title Web Tweet
    link(rel="stylesheet" type="text/css" media="screen" href="/css/normalize.css")
    link(rel="stylesheet" type="text/css" media="screen" href="https://fonts.googleapis.com/css?family=Roboto")
    link(rel="stylesheet" type="text/css" media="screen" href="/css/fontawesome-all.css")
    link(rel="stylesheet" type="text/css" media="screen" href="/css/columns.css")
    link(rel="stylesheet" type="text/css" media="screen" href="/css/main.css")
    block style
  body
    include nav
    block content
    block script
```
- In `nav.pug`, we will have the navbar. And include `nav.pug` in `layout.pug`
```
nav.nav-bar
  .container.nav-container
    ul
      li
        a(href="/")
          img.logo(src="/img/webdxd.png" alt="webdxd")
      li
        a(href="/") Home
    div
      a(href="/profile")
        img.avatar-sm(src="/img/avatar.jpg" alt="avatar")
```
- In `index.pug`, add the following code:
```
extends layout

block content
  .container
    .col-2of5.bg-white.profile
      img.avatar(src="/img/avatar.jpg" alt="avatar")
      h3 Yan Hong
      h5 @honlyan
      h4
        i.fas.fa-map-marker-alt
        |  Vancouver
      p.center
        | Director of EduHacks * Digital Ocean Vancouver Meetup Co-organizer * CEO of HackHub * Founder of Inverse Technology Inc.
    .col-3of5.bg-white
      .tweet
        form(action="#")
          .row
            img.avatar-sm.v-top(src="/img/avatar.jpg" alt="avatar")
            textarea.input-tweet(placeholder="What's up?")
          .row.tweet-actions
            input.hidden(type="file")
            button.btn-clear
              i.far.fa-image
            button.btn-primary Post
      .tweet
        .row
          img.avatar-sm(src="/img/avatar.jpg" alt="avatar")
          h4
            b Yan Hong
          h5 @honlyan
          h5 April 27, 2018 6:14AM
        p New WebDxD project is coming soon…
      .tweet
        .row
          img.avatar-sm(src="/img/ph-logo.png" alt="avatar")
          h4
            b Product Hunt
          h5 @ProductHunt
          h5 April 26, 2018 10:20PM
        p
          | Who goes to banks anymore? Not you, with this UK banking app 💰 https://www.producthunt.com/posts/starling-bank-2
          br
          img(src="/img/tweet.jpg" alt="tweet")
```
- Translate other `html` files from `web-tweet-static` into `pug`

- In `app.js`
  - Change the `GET` API to
  ```
  app.get('/', (req, res) => {
    res.render('index')
  });
  ```
  - Add the following routes
  ```
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
- Test each route to make sure it has the right content