const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:hackhub@hackhub-ujhpv.mongodb.net/hackhub?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .catch(err => {
    console.log(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/**
 * middleware
 * note: middleware is running in sequence, from top to bottom
 */
app.use(bodyParser.json()); // parse client request data to json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev")); // log requests in server console

app.locals.moment = require("moment");

// import routers
const index = require("./routes/index");
const profile = require("./routes/profile");

// apply router middleware
app.use("/", index);
app.use("/profile", profile);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  res.send(err.message);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
