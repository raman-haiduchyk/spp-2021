const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const logger = require('morgan');
const cors = require('cors');


const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const commentRouter = require('./routes/comments');
const editRouter = require('./routes/editor');

const jwtHandler = require('./public/tokenHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors());
app.disable('etag');

function authenticateToken(req, res, next) {
  const name = jwtHandler.validateAccessTokenFromHeader(req.headers);
  if(!name) return res.sendStatus(401);
  req.name = name;
  next();
}

function ignoreFavicon(req, res, next) {
  if (req.url.split('/').pop().includes('favicon')) {
    res.status(204).end();
  } else {
    next();
  }
}

//ignore request for favicon
app.use(ignoreFavicon);

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/profile', authenticateToken, profileRouter);
app.use('/edit', authenticateToken, editRouter);
app.use('/auth', authRouter);
app.use('/comments', commentRouter);
app.use('/funfic', indexRouter);

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
  res.sendStatus(err.status || 500);
});

module.exports = app;
