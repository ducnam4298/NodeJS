const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('contact/index', { title: 'Clothing Store' });
});

module.exports = router;
