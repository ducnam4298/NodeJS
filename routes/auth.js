const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/blank', (req, res, next) => {
  res.render('auth/blank', { title: 'Management Store' });
});


router.get('/font', (req, res, next) => {
  res.render('auth/font', { title: 'Management Store' });
});

module.exports = router;
