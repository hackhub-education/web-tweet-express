# Course Instructions 3-html

## Send files to client
- Create `index.html` in the root folder. The current file structure should be as follow:
```
web-tweet-express
├── app.js          #express entry file
├── index.html
└── package.json    #project information and dependencies
```
- In `index.html`, add the following code:
```
<!DOCTYPE html>
<html>
  <head>
    <title>WebDxD</title>
  </head>
  <body>
    <h1>Welcome to WebDxD !</h1>
  </body>
</html>
```
- In `app.js`, change `GET` API to
```
app.get('/', (req, res) => {
  // find index.html using absolute path
  res.sendFile(path.join(__dirname, 'index.html'))
});
```