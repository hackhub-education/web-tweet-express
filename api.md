# API List

### Host: https://api.webdxd.com

### POST `/auth/login`
* **Description:** authenticate a user.
* **Data:**
```
{
	username: String,
  password: String
}
```

### POST `/auth/signup`
* **Description:** create a user and authenticate.
* * **Data:**
```
{
	username: String,
  password: String
}
```

### GET `/tweet`
* **Description:** get all tweets as an array.

### GET `/tweet/:id`
* **Description:** get detail for a tweet.
* **Url params:** mongo object id of the tweet

### POST `/tweet`
* **Description:** post a new tweet
* **Data:**
```
{
	userId: ObjectId,
	content: String,
  imageUrl: String
}
```

### DELETE `/tweet/:id`
* **Description:** delete a tweet.
* **Url params:** mongo object id of the tweet

### GET `/profile/:id`
* **Description:** get profile data for specific user
* **Url params:** mongo object id of the user

### POST `/profile/:id`
* **Description:** add profile data for specific user
* **Url params:** mongo object id of the user
* **Data:**
```
{
	name: String,
  location: String,
  Bio: String
}
```

### Update `/profile/:id`
* **Description:** update profile data for specific user
* **Url params:** mongo object id of the user
* **Data:**
```
{
	name: String,
  location: String,
  Bio: String
}
```




