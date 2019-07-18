var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var appInsights = require('applicationinsights');
appInsights.setup(process.env.APPLICATIONINSIGHTSKEY || '0b735e38-12ce-46a4-ad6e-8d312e6ff9e0').start();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var imagesRouter = require('./routes/images');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/images', imagesRouter);

app.use('/problem', function() { throw new Error('Something is wrong!'); });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  appInsights.defaultClient.trackException({exception: err})

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
