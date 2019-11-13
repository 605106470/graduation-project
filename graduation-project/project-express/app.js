var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var rootRouter = require('./routes/root');


var app = express();

app.use(session({
  secret:'WJiol_123123#',
  // resave: false,
  // saveUninitialized: true,
  cookie:{
    //path:'/',   默认配置
    // httpOnly:ture, 默认配置
    maxAge: 24*60*60*1000
  }
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//session与redis
// const redisClient = require('./db/redis')
// const sessionStore = new RedisStore({
//   client: redisClient
// })

// app.use(session({
//   secret:'WJiol_123123#',
//   cookie:{
//     //path:'/',   默认配置
//     // httpOnly:ture, 默认配置
//     maxAge: 24*60*60*1000
//   },
//   store:sessionStore
// }))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goodsRouter);
app.use('/root',rootRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
