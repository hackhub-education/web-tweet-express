# Course Instructions 10-tweet

## Tweet API and Intergration
### In this section, we will build the tweet API to allow user post tweets.
- In `models/tweets.js`, add the following line to `TweetsSchema`
```
author: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
```
Instead of saving user data directly into the model, we reference the author field to user model, and only save the user id so that we can populate the user data when doing query.
- In `models/users.js`, add the following line to `UsersSchema`
```
tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweets' }]
```
In this code, we save the tweet id into users profile so we can populate the user's tweets.
- Create `routes/tweet.js` and add the following code
```
const express = require('express');
const passport = require('passport');

const Tweets = require('../models/tweets');
const utils = require('../utils');

const router = express.Router();

router.post('/', utils.requireLogin, async (req, res, next) => {
  try {
    const tweet = new Tweets({ ...req.body, author: req.user._id });
    const doc = await tweet.save();
    // save the tweet id to user profile
    req.user.tweets.push(doc._id);
    await req.user.save();

    return res.json({ success: true });
  } catch (err) {
    return next(err)
  }
});

router.delete('/:id', utils.requireLogin, async (req, res, next) => {
  try {
    const doc = await Tweets.findById(req.params.id);
    if(String(doc.author) === String(req.user._id)) {
      await Tweets.remove({ _id: req.params.id })
      return res.json({ success: true });
    } else {
      return next({ message: 'Can only delete your tweet' });
    }
  } catch (err) {
    return next(err)
  }
});

module.exports = router;
```
**Note** We use async await for our routing middleware to make the code looks much cleaner. After the tweet is saved, we also need to save the tweet id into users profile in `tweets` field.
- In `views/tweet.pug`, change the post tweet form to
```
form#tweetForm
  .tweet
    .row
      img.avatar-sm.v-top(src=user.avatarUrl alt="avatar")
      textarea.input-tweet(placeholder="What's up?" name="content")
    p
      img#previewImage
    .row.tweet-actions
      button#tweetImage.btn-clear(type="button")
        i.far.fa-image
      button.btn-primary(type="submit") Post
```
- Create `public/js/main.js` and add the following code, this file will contain front-end javaScript code.
```
let imageUrl;

$('#tweetForm').submit(function(e) {
  e.preventDefault();
  const content = $('[name=content]').val();
  $.ajax({
    url: '/tweet',
    type: 'POST',
    data: {
      content,
      imageUrl,
    },
    success(res) {
      if (res.success) location.reload();
    }
  });
});

$('#tweetImage').click(function() {
  uploadcare.openDialog(null, {
    previewStep:true,
    crop:true,
  }).done((file) => {
    file.promise().done(fileInfo=>{
      imageUrl = fileInfo.cdnUrl;
      $('#previewImage').attr('src', fileInfo.cdnUrl).attr('alt', 'tweet')
    })
  })
});
```
This code will handle post tweet submit and tweet image upload.
- Finally, in `app.js`
  - Add tweet router
  ```
  const tweet = require('./routes/tweet');

  app.use('/tweet', tweet);
  ```
  - Change
  ```
  app.use((req, res, next) => {
    Tweets.find({}, (err, tweets) => {
      res.locals.tweets = tweets;
      next();
    })
  })
  ```
  to
  ```
  app.use((req, res, next) => {
    const query = req.originalUrl.includes('/profile') ? { author: req.user._id } : {};
    Tweets.find(query, (err, tweets) => {
      res.locals.tweets = tweets;
      next();
    }).populate('author').sort({createdAt: -1 })
  });
  ```
  We will only return user's own tweets when user is in profile page, and then we populate the author field in tweets and sort tweets by create date.