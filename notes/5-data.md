# Course Instructions 5-data

## Render data in pug
- Create `tweets.json` in your project root.
```
web-tweet-express
├── app.js          #express entry file
├── views           #all view files
├── public          #static assets
├── tweets.json     #tweets data
└── package.json    #project information and dependencies
```
- Copy the following code into `tweets.json`
```
[{
	"content": "New WebDxD project is coming soon...",
	"author": {
		"name": "Yan Hong",
		"username": "honlyan",
		"location": "Vancouver",
		"avatarUrl": "/img/avatar.jpg",
		"Bio": "Director of EduHacks * Digital Ocean Vancouver Meetup Co-organizer * CEO of HackHub * Founder of Inverse Technology Inc."
	},
	"createdAt": "2018-04-27T13:14:26.844Z"
},{
	"content": "Who goes to banks anymore? Not you, with this UK banking app 💰 https://www.producthunt.com/posts/starling-bank-2.",
	"imageUrl": "/img/tweet.jpg",
	"author": {
		"name": "Product Hunt",
		"username": "ProductHunt",
		"location": "Vancouver",
		"avatarUrl": "/img/ph-logo.png",
		"Bio": ""
	},
	"createdAt": "2018-04-27T05:20:26.844Z"
}]
```
- Install `moment`
```
npm install --save moment
```
- In `app.js`
  - Require `tweets.json` 
  ```
  const tweets = require('./tweets');
  ```
  - Change the `GET` API to
  ```
  app.get('/', (req, res) => {
    res.render('index', { tweets })
  });
  ```
  - Add the following code before `GET` API
  ```
  app.locals.moment = require('moment');
  ```
  **Note:** The will allow you to use moment in pug.
- In `index.pug`, replace
```
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
with
```
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
