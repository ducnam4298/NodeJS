const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('user/index', { title: 'Clothing Store' });
});

router.get('/profile', (req, res, next) => {
  res.render('user/profile', { title: 'Management Store' });
});

router.get('/login', (req, res, next) => {
  res.render('user/login', { title: 'Clothing Store' });
});

module.exports = router;