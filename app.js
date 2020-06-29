require('./models/db');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser")
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const blogRouter = require('./routes/blog');
const contactRouter = require('./routes/contact');
const colorRouter = require('./routes/color');
const sizeRouter = require('./routes/size');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const errorRouter = require('./routes/error');
const otherRouter = require('./routes/other');
// const authRouter = require('./routes/auth');
// const authRouter = require('./routes/auth');
// const aboutRouter = require('./routes/about');
// const blogDetailRouter = require('./routes/blog-detail');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log(__dirname);

app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/color', colorRouter);
app.use('/size', sizeRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/error', errorRouter);
app.use('/other', otherRouter);

// app.use('/auth',authRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
