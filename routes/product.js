const express = require('express');
const multer = require('multer');
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
  res.render('product/index', {
    title: authTitle,
    listProducts: listProducts,
    listCategories: listCategories,
    listColors: listColors,
    listSizes: listSizes
  });
});

router.get('/', async (req, res, next) => {
  const listProducts = await getListProduct();
  res.render('product/product', {
    title: customTitle,
    listProducts: listProducts
  });
});

router.get('/product-detail', (req, res, next) => {
  res.render('product/product-detail', { title: customTitle });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), true);
  }
};

const upload = multer({ storage, fileFilter })

router.post('/store', upload.array('image', 12), async (req, res, next) => {
  const image = [];
  const detail = [];

  const { name, category_id, size_id, color_id, quantity, price, description } = req.body;
  for (let path of req.files) {
    image.push('/uploads/' + path.filename);
  }
  const product = await Product.find({ name: name });

  const categories = await Category.find({ _id: category_id });
  const category = categories[0].name;

  const colors = await Color.find({ _id: color_id });
  const color = colors[0].name;

  const sizes = await Size.find({ _id: size_id })
  const size = sizes[0].name;
  detail.push({
    color: color,
    size: size,
    quantity: quantity,
  });
  if (product.length === 0) {
    await Product.create({
      name,
      category,
      detail,
      price,
      description,
      image,
      created_at: Date.now(),
      updated_at: Date.now()
    });
    res.redirect('/product/index');
  }
  // else {
  //   for (let i = 0; i < product[0].detail.length; i++) {
  //     if (color === product[0].detail[i].color && size === product[0].detail[i].size) {
  //       Product.findByIdAndUpdate(
  //         { _id: product[0].detail[i]._id },
  //         { $set: { quantity: Number(product[0].detail[0].quantity) + Number(quantity) } },
  //         { useFindAndModify: true })
  //         .then(doc => {
  //           // res.redirect('/product/index');
  //           console.log('1');
  //           console.log(Number(product[0].detail[0].quantity) + Number(quantity));
  //           res.send('1');
  //         });
  //     }
  //     else {
  //       detail.push({
  //         color: color,
  //         size: size,
  //         quantity: quantity
  //       });
  //       await Product.create({
  //         name,
  //         category,
  //         detail,
  //         price,
  //         description,
  //         image,
  //         created_at: Date.now(),
  //         updated_at: Date.now()
  //       });
  //       // res.redirect('/product/index')
  //       console.log('2');
  //       res.send('2');
  //     }
  //   };
  // }
});

router.post('/delete/:product_id', async (req, res, next) => {
  const product_id = req.params.product_id;
  Product.findByIdAndRemove(product_id, (err, doc) => {
    if (err) throw err;
    res.redirect('/product/index');
  });
});

module.exports = router;
