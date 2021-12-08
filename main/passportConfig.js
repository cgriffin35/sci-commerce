const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./db");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    pool.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email],
      (err, results) => {
        if (err) {
          res.status(400).send(err);
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.user_password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        } else {
          return done(null, false, {
            message: "No user with that email address",
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.uid));

  passport.deserializeUser((uid, done) => {
    pool.query(`SELECT * FROM users WHERE uid = $1;`, [uid], (err, results) => {
      if (err) {
        return done(err);
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
