const express = require('express');
const router = express.Router();

const Size = require('../models/size.model');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('size/index', { title: 'Clothing Store' });
});

module.exports = router;
