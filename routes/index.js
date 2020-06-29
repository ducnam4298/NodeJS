const express = require('express');
const router = express.Router();

const customTitle = 'Clothing Store';
const authTitle = 'Management Store';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home/index', { title: customTitle });
});

module.exports = router;
