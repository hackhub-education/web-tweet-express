# Course Instructions 1-server

## Build your express server
- Create `package.json`
```
npm init
```
- Install `express`
```
npm install --save express
```

- Create an express entry point in the root and name it as `app.js`. The file structure should be as follow:
```
web-tweet-express
├── app.js          #express entry file
└── package.json    #project information and dependencies
```

- In `app.js`
  - Require `express` module
  ```
  const express = require('express');
  const app = express();
  ```

  - Add a simple `GET` API
  ```
  ...
  app.get('/', (req, res) => res.send('Hello World!'));
  ```

  - Start server by listening at port `3000`
  ```
  ...
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
  ```
- Open browser and go to [http://localhost:3000](http://localhost:3000)