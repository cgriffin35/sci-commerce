const categoriesRouter = require("express").Router();
const {pool} = require("./db");

categoriesRouter.get('/', (req, res, next)=>{
  pool.query('SELECT * FROM categories;', (err, categories)=>{
    if(err){
      res.status(400).json(err);
    } else {
      res.json(categories.rows)
    }
  })
})

module.exports = categoriesRouter;