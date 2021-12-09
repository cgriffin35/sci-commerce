const cartsRouter = require("express").Router();
const { pool } = require("./db");

cartsRouter.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  pool.query(
    `SELECT * FROM carts WHERE user_id = $1
      ORDER BY date_added ASC;`,
    [userId],
    (err, carts) => {
      if (err) res.status(400).json(err);
      else res.json(carts.rows);
    }
  );
});

cartsRouter.post("/",(req, res, next) => {
  const { userId, productId, quantity, variants } = req.body;
  pool.query(
    `INSERT INTO carts (user_id, product_id, product_quantity, variants, date_added)
      VALUES($1, $2, $3, $4, NOW())
      RETURNING *;`,
    [userId, productId, quantity, variants],
    (err, cart) => {
      if (err){
        console.log(err); res.status(400).json(err);
      } else res.status(201).json(cart.rows);
    }
  );
});

cartsRouter.delete("/:id",(req, res, next) => {
  const { id } = req.params;
  pool.query("DELETE FROM carts WHERE id = $1;", [id], (err, cart) => {
    if (err) res.status(400).json(err);
    else res.status(200).json();
  });
});

cartsRouter.put("/:id",(req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;
  pool.query(
    `UPDATE carts SET product_quantity=$2 WHERE id=$1
      RETURNING *;`,
    [id, quantity],
    (err, cart) => {
      if (err) res.status(400).json(err);
      else res.json(cart.rows);
    }
  );
});

cartsRouter.delete('/clear/:userId', (req, res, next) => {
  const {userId} = req.params;

  pool.query(
    `DELETE FROM carts WHERE user_id = $1`,
    [userId],
    (err, results) => {
      if (err) res.status(400).json(err);
      else res.status(200).json()
    }
  )
})

module.exports = cartsRouter;
