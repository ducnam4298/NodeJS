const express = require('express');
const router = express.Router();

const Size = require('../models/size.model');
const Color = require('../models/color.model');

const customTitle = 'Clothing Store';
const authTitle = 'Management Store';

const getListSize = async () => {
  const listSize = await Size.find();
  return listSize;
};

const getListColor = async () => {
  const listColor = await Color.find();
  return listColor;
}
/* GET home page. */
router.get('/', async (req, res, next) => {
  const listSizes = await getListSize();
  const listColors = await getListColor();
  res.render('size/index', {
    title: authTitle,
    listSizes: listSizes,
    listColors: listColors
  });
});

router.post('/store', async (req, res, next) => {
  const { name, color, quantity } = req.body;
  const size = await Size.find({ name: name });
  if (size.length === 0) {
    await Size.create({
      name,
      created_at: Date.now(),
      updated_at: Date.now()
    });
  }
  res.redirect('/size');
});

router.get('/edit/:size_id', async (req, res, next) => {
  Size.findById(req.params.size_id, (err, size) => {
    if (err) {
      console.log(err);
      throw err
    }
    res.render('size/edit', {
      title: authTitle,
      size: size
    });
  });
});

router.post('/update/:size_id', async (req, res, next) => {
  const { name } = req.body;
  let size_id = req.params.size_id;
  Size.findByIdAndUpdate(
    { _id: size_id },
    { $set: { name: name } },
    { useFindAndModify: false })
    .then(doc => {
      res.redirect("/size");
    });
});

router.post('/delete/:size_id', async (req, res, next) => {
  const size_id = req.params.size_id;
  Size.findByIdAndRemove(size_id, (err, doc) => {
    if (err) throw err;
    res.redirect('/size');
  });
});

module.exports = router;
