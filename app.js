const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminDashboardRouter = require('./routes/admin_dashboard');
const sketchRouter = require('./routes/sketch');
const exhibitRouter = require('./routes/exhibit');
const backgroundRouter = require('./routes/backgrounds');
const scheduleRouter = require('./routes/schedule');

const {SESSION_SECRET} = process.env;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(session({secret: SESSION_SECRET}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminDashboardRouter);
app.use('/sketch', sketchRouter);
app.use('/exhibit', exhibitRouter);
app.use('/background', backgroundRouter);
app.use('/schedule', scheduleRouter);

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
  res.render('error', {admin: false, signedIn: false});
});

module.exports = app;
