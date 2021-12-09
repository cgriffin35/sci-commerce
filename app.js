const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const router = require("./main/api");
const passport = require("passport");
var session = require("cookie-session");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

const initializePassport = require("./main/passportConfig");

initializePassport(passport);

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./Client/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./Client/build")));
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
module.exports = app;
