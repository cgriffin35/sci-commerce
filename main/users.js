const usersRouter = require("express").Router();
const { pool } = require("./db");

const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();

usersRouter.get("/", (req, res, next) => {
  res.send(req.user);
});

usersRouter.post("/register", async (req, res, next) => {
  let { firstName, lastName, email, password, password2 } = req.body;

  let errors = [];

  if (!firstName || !lastName || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be at least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.status(404).send({ errors });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      "SELECT * FROM users WHERE email = $1;",
      [email],
      (err, users) => {
        if (err) {
          res.status(404).send({ err });
        }
        if (users.rows.length > 0) {
          res.send(200).send({ message: "Email already in use" });
        } else {
          pool.query(
            `INSERT INTO users (first_name, last_name, email, user_password, date_created)
                      VALUES ($1, $2, $3, $4, NOW())
                      RETURNING *;`,
            [firstName, lastName, email, hashedPassword],
            (err2, results) => {
              if (err2) {
                res.status(400).send({ err2 });
              } else {
                res.status(201).send(results.rows);
              }
            }
          );
        }
      }
    );
  }
});

usersRouter.post("/login", passport.authenticate("local"), (req, res, next) => {
  if (!req.user) res.status(404).send("No user found.")
  else {
    req.logIn(req.user, (err) => {
      if (err) res.status(400).send(err);
      res.send("Successfully Authenticated");
    });
  }
});

usersRouter.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
})

module.exports = usersRouter;
