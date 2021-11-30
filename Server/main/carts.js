const cartsRouter = require("express").Router();
const { pool } = require("./db");
const checkNotAuthenticated = require("./users")

cartsRouter.get("/", checkNotAuthenticated,(req, res, next) => {
  const { userId } = req.body;
  pool.query(
    `SELECT * FROM carts WHERE user_id = $1
      INNER JOIN products ON products.id = carts.product_id;`,
    [userId],
    (err, carts) => {
      if (err) res.status(400).send(err);
      else res.send(carts.rows);
    }
  );
});

cartsRouter.post("/", checkNotAuthenticated,(req, res, next) => {
  const { userId, productId, quantity, varients } = req.body;
  pool.query(
    `INSERT INTO carts (user_id, product_id, product_quantity, varients, date_added)
      VALUES($1, $2, $3, $4, NOW());`,
    [userId, productId, quantity, varients],
    (err, cart) => {
      if (err) res.status(400).send(err);
      else res.status(201).send(cart.rows);
    }
  );
});

cartsRouter.delete("/:id", checkNotAuthenticated,(req, res, next) => {
  const { id } = req.params;
  pool.query("DELETE FROM carts WHERE id = $1;", [id], (err, cart) => {
    if (err) res.status(400).send(err);
    else res.status(200).send();
  });
});

cartsRouter.put("/:id", checkNotAuthenticated,(req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;
  pool.query(
    "UPDATE carts SET product_quantity=$2 WHERE id=$1;",
    [id, quantity],
    (err, cart) => {
      if (err) res.status(400).send(err);
      else res.send(cart.rows);
    }
  );
});

module.exports = cartsRouter;
