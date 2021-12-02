const favoritesRouter = require("express").Router();
const { pool } = require("./db");
const checkNotAuthenticated = require("./users");

favoritesRouter.get("/", checkNotAuthenticated, (req, res, next) => {
  const { userId } = req.body;
  pool.query(
    `SELECT * FROM favorites WHERE user_id = $1`,
    [userId],
    (err, favs) => {
      if (err) res.status(400).send(err);
      else res.send(favs.rows);
    }
  );
});

favoritesRouter.post("/", checkNotAuthenticated, (req, res, next) => {
  const { userId, productId } = req.body;
  pool.query(
    `INSERT INTO favorites(user_id, product_id, favorited_date)
      VALUES($1, $2, NOW());`,
    [userId, productId],
    (err, fav) => {
      if (err) res.status(400).send(err);
      else res.status(201).send(fav.rows);
    }
  );
});

favoritesRouter.delete("/:id", checkNotAuthenticated, (req, res, next) => {
  const { id } = req.params;

  pool.query(`DELETE FROM favorites WHERE id = $1`, [id], (err, fav) => {
    if (err) res.status(400).send(err);
    else res.status(200).send();
  });
});

favoritesRouter.get("/populars", (req, res, next) => {
  pool.query(
    `SELECT product_id, COUNT(*) as popularity FROM favorites
      GROUP BY product_id
      ORDER BY COUNT(*) DESC;`, [], (err, results) =>{
        if(err) res.status(400).send(err)
        else res.send(results.rows);
      }
  )
});

module.exports = favoritesRouter;
