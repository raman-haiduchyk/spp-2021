const createError = require('http-errors');
const express = require('express')
;
const path = require('path');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/authorization');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'secret_key'
}));

function checkUnauthorized(req, res, next) {
  if (req.session.companyId) {
    next();
  } else {
    res.redirect('/authorization');
  }
}

function checkAuthorized(req, res, next) {
  console.log(req.url);
  if (req.session.companyId && req.url !== '/logout') {
    res.redirect('/');
  } else {
    next();
  }
}



app.use('/profile', checkUnauthorized, profileRouter);
app.use('/authorization', checkAuthorized, authRouter);
app.use('/', indexRouter);

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
