const productsRouter = require("express").Router();
const {pool} = require("./db");

productsRouter.get("/", (req, res, next) => {
  pool.query("SELECT * FROM products;", (err, products) => {
    if (err) {
      res.status(404).send();
    } else {
      res.send(products.rows);
    }
  });
});

productsRouter.get("/category/:category", (req, res, next) => {
  const {category} = req.params;

  pool.query("SELECT * FROM products WHERE category = $1;", [category], (err, products) => {
    if(err) res.status(400).send(err)
    else res.send(products.rows);
  })
})

productsRouter.get("/:id", (req, res, next) => {
  pool.query(
    "SELECT * FROM products WHERE id = $1;",
    [req.params.id],
    (err, product) => {
      if (err) {
        res.status(404).send();
      } else {
        res.send(product.rows);
      }
    }
  );
});

module.exports = productsRouter;
