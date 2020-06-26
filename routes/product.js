const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

/* GET home page. */
router.get('/index', (req, res, next) => {
  res.render('product/index', { title: 'Management Store' });
});

router.get('/', (req, res, next) => {
  res.render('product/product', { title: 'Clothing Store' });
});

router.get('/product-detail', (req, res, next) => {
  res.render('product/product-detail', { title: 'Clothing Store' });
});

router.get('/add', (req, res, next) => {
  res.render('product/add', { title: 'Clothing Store' });
});



module.exports = router;
