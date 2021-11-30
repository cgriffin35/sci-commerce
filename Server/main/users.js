const usersRouter = require("express").Router();
const {pool} = require("./db");

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
                      VALUES($1, $2, $3, $4, NOW())
                      RETURNING id;`,
            [firstName, lastName, email, hashedPassword],
            (er, results) => {
              if(er){
                res.status(404).send({er})
              } else {
                res.status(200).send({results})
              }
            }
          );
        }
      }
    );
  }
});

usersRouter.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) res.status(400).send(err);
    if(!user) res.status(404).send("No user found.");
    else{
      req.logIn(user, err =>{
        if(err) res.status(400).send(err);
        res.send("Successfully Authenticated");
      })
    }
  })(req, res, next);
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = usersRouter;
module.exports = checkNotAuthenticated;