const purchasesRouter = require("express").Router();
const { pool } = require("./db");
const checkNotAuthenticated = require("./users");

purchasesRouter.get("/", checkNotAuthenticated, (req, res, next) => {
  const { userId } = req.body;

  pool.query(
    `SELECT * FROM purchases WHERE user_id = $1
      INNER JOIN products ON products.id = purchases.product_id;`,
    [userId],
    (err, purchases) => {
      if (err) res.status(400).send(err);
      else res.send(purchases.rows);
    }
  );
});

purchasesRouter.post("/", checkNotAuthenticated, (req, res, next) => {
  const { products, userId, total, card } = req.body;

  pool.query(
    `INSERT INTO purchases(user_id, products, total_price, card_used, date_purchased)
      VALUES ($1, $2, $3, $4, NOW());`,
    [userId, products, total, card],
    (err, purchases) => {
      if (err) res.status(400).send(err);
      else res.status(201).send(purchases.rows);
    }
  );
});

module.exports = purchasesRouter;
