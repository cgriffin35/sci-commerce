const purchasesRouter = require("express").Router();
const { pool } = require("./db");

purchasesRouter.get("/", (req, res, next) => {
  const { userId } = req.body;

  pool.query(
    `SELECT * FROM purchases WHERE user_id = $1
      ORDER BY date_purchased;`,
    [userId],
    (err, purchases) => {
      if (err) res.status(400).send(err);
      else res.send(purchases.rows);
    }
  );
});

purchasesRouter.post("/", (req, res, next) => {
  const { products, userId, total } = req.body;

  pool.query(
    `INSERT INTO purchases(user_id, products, total_price, date_purchased)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;`,
    [userId, products, total],
    (err, purchases) => {
      if (err) res.status(400).send(err);
      else res.status(201).send(purchases.rows);
    }
  );
});

module.exports = purchasesRouter;
