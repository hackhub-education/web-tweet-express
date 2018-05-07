# Course Instructions 2-middleware

## Using middleware
- Install packages with the following command
```
npm install --save morgan cookie-parser body-parser
```
- In `app.js`
  - Require the following modules
  ```
  const logger = require('morgan');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  ```
  - Apply the modules as Application-level middleware
  ```
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(logger('dev'));
  ```
  **Note:** Express middleware is running in sequence from top to bottom.

  - Add Error-handling middlware after Application-level middleware
  ```
  app.use((err, req, res, next)=> {
    res.send(err.message);
  });
  ```
  **Note:** Error-handling middlware always takes four arguments

  - Add 404 handler before Error-handling middlware
  ```
  // catch 404 error and forward to error handler
  app.use((req, res, next) => {
    const err =  new Error('Page Not Found');
    err.status = 404;
    next(err);
  });
  ```
