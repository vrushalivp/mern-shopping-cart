var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var userAuthRouter = require('./routes/userAuth');
var orderRouter = require('./routes/orders');

var adminLoginRouter = require('./routes/admin/adminAuth');
var adminUserRouter = require('./routes/admin/user');
var adminProductRouter = require('./routes/admin/product');
var adminOrderRouter = require('./routes/admin/order');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ejs',(req,res) => {
  res.render('./shared/home')
})

/*
 * Add middleware. Because we defined the first parameter ( '/api' ), it will run
 * only for urls that starts with '/api/*'
 */
app.use('/api/auth', require('./middleware/auth'));

/*
 * Add the protected route '/users' after '/api'
 * So now it is available on /api/hello-world
 */
// app.use('/', require('./routes/userAuth'),router);

app.use('/api/users', userAuthRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);


app.use('/admin',adminLoginRouter );
app.use('/admin',adminUserRouter );
app.use('/admin',adminProductRouter );
app.use('/admin',adminOrderRouter );






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('app error : '+err);
  // render the error page
  res.render('error');
});

module.exports = app;