const express = require('express');
const router = express.Router();

const Category = require('../models/category.model');
const customTitle = 'Clothing Store';
const authTitle = 'Management Store';
const getListCategory = async () => {
  const listCategory = await Category.find();
  return listCategory;
};

/* GET home page. */
router.get('/', async (req, res, next) => {
  const listCategories = await getListCategory();
  res.render('category/index', {
    title: authTitle,
    listCategories: listCategories
  });
});

router.post('/store', async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.find({ name: name });
  if (category.length === 0) {
    await Category.create({
      name,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  };
  res.redirect("/category/");
});

router.get('/edit/:category_id', async (req, res, next) => {
  await Category.findById(req.params.category_id, (err, category) => {
    if (err) {
      console.log(err);
      throw err
    }
    res.render('category/edit', {
      title: authTitle,
      category: category
    });
  });
});

router.post('/update/:category_id', async (req, res, next) => {
  const { name } = req.body;
  let category_id = req.params.category_id;
  await Category.findByIdAndUpdate(
    { _id: category_id },
    { $set: { name: name } },
    { useFindAndModify: false })
    .then(doc => {
      res.redirect("/category");
    });
});

router.post('/delete/:category_id', async (req, res, next) => {
  let category_id = req.params.category_id;
  await Category.findByIdAndRemove(category_id, (err, doc) => {
    if (err) throw err;
    res.redirect('/category');
  });
});

module.exports = router;
