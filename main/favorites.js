const favoritesRouter = require("express").Router();
const { pool } = require("./db");

favoritesRouter.get("/", (req, res, next) => {
  const { userId } = req.body;
  pool.query(
    `SELECT * FROM favorites WHERE user_id = $1
      ORDER BY favorited_date ASC`,
    [userId],
    (err, favs) => {
      if (err) res.status(400).json(err);
      else res.json(favs.rows);
    }
  );
});

favoritesRouter.post("/", (req, res, next) => {
  const { userId, productId } = req.body;
  pool.query(
    `INSERT INTO favorites(user_id, product_id, favorited_date)
      VALUES($1, $2, NOW())
      RETURNING *;`,
    [userId, productId],
    (err, fav) => {
      if (err) res.status(400).json(err);
      else res.json(fav.rows);
    }
  );
});

favoritesRouter.delete("/", (req, res, next) => {
  const { userId, productId } = req.body;

  pool.query(`DELETE FROM favorites WHERE user_id = $1 AND product_id = $2`, [userId, productId], (err, fav) => {
    if (err) res.status(400).json(err);
    else res.status(200).json();
  });
});

favoritesRouter.get("/populars", (req, res, next) => {
  pool.query(
    `SELECT product_id, COUNT(*) as popularity FROM favorites
      GROUP BY product_id
      ORDER BY COUNT(*) DESC;`, [], (err, results) =>{
        if(err) res.status(400).json(err)
        else res.json(results.rows);
      }
  )
});

module.exports = favoritesRouter;
