const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('other/index', { title: 'Clothing Store' });
});

router.get('/about', (req, res, next) => {
  res.render('other/about', { title: 'Clothing Store' });
});

module.exports = router;
