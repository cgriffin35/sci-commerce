const express = require("express");
const router = express.Router();

const productsRouter = require("./products");
const categoriesRouter = require("./categories");
const usersRouter = require("./users");
const cartsRouter = require("./carts");
const purchasesRouter = require("./purchases");
const favoritesRouter = require("./favorites");

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/carts", cartsRouter);
router.use("/purchases", purchasesRouter);
router.use("/favorites", favoritesRouter);

module.exports = router;
