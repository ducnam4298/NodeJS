const express = require('express');
const router = express.Router();

const Color = require('../models/color.model');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('color/index', { title: 'Clothing Store' });
});

module.exports = router;
