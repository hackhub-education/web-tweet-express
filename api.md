# API List

### Host: https://api.webdxd.com

### POST `/auth/login`
* **Description:** authenticate a user.
* **Request body:**
```
{
  username: String,
  password: String
}
```
* **Response**
```
{
  token: String,
  error: Object,
  success: Bool
}
```
### POST `/auth/signup`
* **Description:** create a user and authenticate.
* **Request body:**
```
{
  username: String,
  password: String
}
```
* **Response**
```
{
  token: String,
  error: Object,
  success: Bool
}
```

### GET `/tweet`
* **Description:** get all tweets.
* **Response**
```
{
  tweets: Array,
  error: Object,
  success: Bool
}
```

### GET `/tweet/:id`
* **Description:** get detail for a tweet.
* **Url params:** mongo object id of the tweet
* **Response**
```
{
  tweet: Object,
  error: Object,
  success: Bool
}
```

### POST `/tweet`
* **Description:** post a new tweet
* **Request body:**
```
{
  userId: ObjectId,
  content: String,
  imageUrl: String
}
```
* **Response**
```
{
  tweet: Object,
  error: Object,
  success: Bool
}
```
### DELETE `/tweet/:id`
* **Description:** delete a tweet.
* **Url params:** mongo object id of the tweet
* **Response**
```
{
  error: Object,
  success: Bool
}
```

### GET `/profile/:id`
* **Description:** get profile data for specific user
* **Url params:** mongo object id of the user
* **Response**
```
{
  profile: Object,
  error: Object,
  success: Bool
}
```

### POST `/profile/:id`
* **Description:** add profile data for specific user
* **Url params:** mongo object id of the user
* **Request body:**
```
{
  name: String,
  location: String,
  Bio: String
}
```
* **Response**
```
{
  profile: Object,
  error: Object,
  success: Bool
}
```

### Update `/profile/:id`
* **Description:** update profile data for specific user
* **Url params:** mongo object id of the user
* **Request body:**
```
{
  name: String,
  location: String,
  Bio: String
}
```
* **Response**
```
{
  profile: Object,
  error: Object,
  success: Bool
}
```




