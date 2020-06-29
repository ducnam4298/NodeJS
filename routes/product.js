const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const Category = require('../models/category.model');
const Color = require('../models/color.model');
const Size = require('../models/size.model');
const customTitle = 'Clothing Store';
const authTitle = 'Management Store';

const getListProduct = async () => {
  const listProduct = await Product.find();
  return listProduct;
};

const getListCategory = async () => {
  const listCategory = await Category.find();
  return listCategory;
};

const getListColor = async () => {
  const listColor = await Color.find();
  return listColor;
};

const getListSize = async () => {
  const listSize = await Size.find();
  return listSize;
};

/* GET home page. */
router.get('/index', async (req, res, next) => {
  const listProducts = await getListProduct();
  const listCategories = await getListCategory();
  const listColors = await getListColor();
  const listSizes = await getListSize();
  console.log(listColors);
  res.render('product/index', {
    title: authTitle,
    listProducts: listProducts,
    listCategories: listCategories,
    listColors: listColors,
    listSizes: listSizes
  });
});

router.get('/', (req, res, next) => {
  res.render('product/product', { title: customTitle });
});

router.get('/product-detail', (req, res, next) => {
  res.render('product/product-detail', { title: customTitle });
});





module.exports = router;
