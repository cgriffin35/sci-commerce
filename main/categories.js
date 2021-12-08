const categoriesRouter = require("express").Router();
const {pool} = require("./db");

categoriesRouter.get('/', (req, res, next)=>{
  pool.query('SELECT * FROM categories;', (err, categories)=>{
    if(err){
      res.status(400).send(err);
    } else {
      res.send(categories.rows)
    }
  })
})

module.exports = categoriesRouter;