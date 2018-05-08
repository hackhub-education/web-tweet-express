# Course Instructions 9-profile

## User profile API and intergration
### In this section, we will build the profile API including edit profile and update profile avatar, and refactor our code base on user profile.

- In `routes/profile.js`, add the following code
```
const Users = require('../models/users');

router.post('/edit', utils.requireLogin, (req, res) => {
  Users.update({ _id: req.user._id }, req.body, (err) => {
    if(err) {
      return next(err);
    } else {
      return res.redirect('/profile')
    }
  });
});

router.post('/avatar', utils.requireLogin, (req, res) => {
  Users.update({ _id: req.user._id }, req.body, (err) => {
    if(err) {
      return next(err);
    } else {
      return res.json({ success: true })
    }
  });
});
```
We will use form to handle the edit profile and ajax to handle profile avatar.
- Since every page display the tweets list, we don't want to write the same code for multiple times. Let's refactor our code to reuse the tweet list as a template.
- Create `views/tweet.pug`, and add the following code
```
.col-3of5.bg-white
  if (user)
    .tweet
      form(action="#")
        .row
          img.avatar-sm.v-top(src=user.avatarUrl alt="avatar")
          textarea.input-tweet(placeholder="What's up?")
        .row.tweet-actions
          input.hidden(type="file")
          button.btn-clear
            i.far.fa-image
          button.btn-primary Post
  each tweet in tweets
    .tweet
      .row
        img.avatar-sm(src=tweet.author.avatarUrl alt="avatar")
        h4
          b=tweet.author.name
        h5=`@${tweet.author.username}`
        h5=moment(tweet.createdAt).format('MMMM D, YYYY hh:mm A')
      p=tweet.content
        if (tweet.imageUrl)
          img(src=tweet.imageUrl alt="tweet")
```
We will only display the post tweet form to logged in user, and render each tweets passed from server.
- **Replace** the code in `views/editProfile.pug` with the following
```
extends layout

block content
  .container
    form(action='/profile/edit' method="POST")
      .col-2of5.bg-white.profile
        .relative.img-edit
          img.avatar(src=user.avatarUrl alt="avatar")
          img.avatar-upload(src="/img/upload.png" alt="upload-img")
        input.input-profile(type="text" value=user.name name="name" placeholder="Full name")
        h5=`@${user.username}`
        input.input-profile(type="text" value=user.location name="location" placeholder="Location")
        textarea.input-profile(placeholder="Personal description" name="bio")=user.bio
        button.btn-primary.space-top Save
        a.btn-border.space-top(href="/profile") Cancel
    include tweet
```
**Note:** The keyword `include` in pug allow you to insert the contents of one Pug file into another.
- **Replace** the tweet list part in other pug files with
```
include tweet
```
- Since every page will need the tweets data, we need to modify our `app.js` by adding the following
```
const Tweets = require('./models/tweets');

app.use((req, res, next) => {
  Tweets.find({}, (err, tweets) => {
    res.locals.tweets = tweets;
    next();
  })
})
```
We added a app-level middleware, the same as we did for passing user data to template, we pass all tweets data to each pug file.
- We will use a third-party library **Uploadcare** to allow user upload their image to the cloud.
  - Register your account at [https://uploadcare.com/accounts/signup/](https://uploadcare.com/accounts/signup/)
  - Create a new project
  - Go to the tab **API Keys**, and copy your `Public key`
  - In `views/layout.pug`, before `block style`, add the following code
  ```
  script.
    UPLOADCARE_PUBLIC_KEY="<YOUR-PUBLIC-KEY>"
    UPLOADCARE_LOCALE = "zh";
    UPLOADCARE_TABS = "file url facebook gdrive dropbox instagram";
  script(src="https://ucarecdn.com/libs/widget/3.2.3/uploadcare.full.min.js" charset="utf-8")
  script(src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js")
  ```
  **Replace** your `Public key` with `<YOUR-PUBLIC-KEY>`
  In this code we have loaded the uploadcare library and jQuery, and added some configurations for uploadcare.
  
  **Note:** The uploadcare public key is required.
- Back to `views/editProfile.pug`, add the following code at the end of file
```
block script
  script.
    $('.avatar-upload').click(function() {
      uploadcare.openDialog(null, {
        previewStep:true,
        crop:true,
      }).done((file) => {
        file.promise().done(fileInfo=>{
          $.ajax({
            url: '/profile/avatar',
            type: 'POST',
            data: { avatarUrl: fileInfo.cdnUrl },
            success(res) {
              if (res.success) location.href='/profile';
            }
          });
        })
      })
    });
```
**Note:** The `block script` need to be aligned with `block content`.

In this code, we use jQuery to catch the click event, open the uploadcare dialog, and post the file url using jQuery ajax to the server.
