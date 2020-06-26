const express = require('express');
const router = express.Router();

const Category = require('../models/category.model');

const getListCategory = async () => {
  const listCategory = await Category.find();
  return listCategory;
};

/* GET home page. */
router.get('/', async (req, res, next) => {
  const listCategories = await getListCategory();
  res.render('category/index', {
    title: 'Clothing Store',
    listCategories: listCategories
  });
});

router.post('/store', async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.find({ name: name });
  if (category.length === 0) {
    console.log(category.length);
    await Category.create({
      name,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  };
  console.log(category.length);
  res.redirect("/category/");
});

router.post('/update', async (req, res, next) => {
  const { _id, name } = req.body;
  const category = await Category.find({ _id: _id });

  if (category.length) {
    await Category.updateMany({ _id: _id }, {
      $set: {
        name,
        updated_at: Date.now()
      }
    });
  };
  res.redirect("/category");
});

router.post('/delete', async (req, res, next) => {
  const { _id } = req.body;
  const category = await Category.findById({ _id: _id });
  if (category) {
    await Category.deleteOne({ _id: _id });
  };
  res.redirect('/category')
})
module.exports = router;
