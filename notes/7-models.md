# Course Instructions 7-models

## Using Mongoose
- Create `models` folder in your project root, and two files inside `models` folder
```
web-tweet-express
├── app.js          #express entry file
├── views           #all view files
├── public          #static assets
├── routes          #express router modules
├── models          #Mongoose models
│   ├── tweets.js
│   └── users.js
├── tweets.json     #tweets data
└── package.json    #project information and dependencies
```
- Install `mongoose`
```
npm install --save mongoose
```
- In `app.js`, add the following code to connect express server to mongoDB using Mongoose
```
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/webdxd');
```
- In `models/tweets.js`, we will create the tweets model with the following code
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetsSchema = new Schema({
    content: { type: String, required: true },
    imageUrl: String,
    author: {
        name: { type: String, required: true },
        username: { type: String, required: true },
        location: String,
        bio: String,
        avatarUrl: { type: String, default: '/img/webdxd.png' }
    },
    createdAt: { type: Date, required: true, default: Date.now }
});

const Tweets = mongoose.model('Tweets', TweetsSchema);

module.exports = Tweets;
```
- In `models/users.js`, we will create the users model with the following code
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    location: String,
    bio: String,
    avatarUrl: { type: String, default: '/img/webdxd.png' }
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
```
- In `routes/index.js`,
  - **Replace**
  ```
  const tweets = require('../tweets');
  ```
  with
  ```
  const Tweets = require('../models/tweets');
  ```
  - Change `GET /` to the following code to find all documents in the `Tweets` model, and pass it to pug.
  ```
  router.get('/', (req, res) => {
    Tweets.find({}, (err, tweets) => {
      res.render('index', { tweets });
    })
  });
  ```