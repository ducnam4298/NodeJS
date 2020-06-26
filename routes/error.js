const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('error/auth-404', { title: 'Clothing Store' });
});

router.get('/', (req, res, next) => {
  res.render('error/user-404', { title: 'Clothing Store' });
});

module.exports = router;
