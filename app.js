const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('./app_server/models/db');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;


const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_server/routes/apiUniversidad');
const authLocalRouter = require('./app_server/routes/authLocal');
const authFacebookRouter = require('./app_server/routes/authFacebok');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(require('express-session')({
  secret: 'nodejs-twig-secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/twigjs/twig.min.js', express.static(__dirname + '/node_modules/twig/twig.min.js'));
app.use('/shared', express.static(__dirname + '/app_server/views/shared'));

app.use('/', indexRouter);
app.use('/', authLocalRouter);
app.use('/', authFacebookRouter);
app.use('/api', apiRouter);

//passport config
const User = require('./app_server/models/user');

passport.use(User.createStrategy());

//Facebook strategy
passport.use(new Strategy({
  clientID: '580439325646370',
  clientSecret: 'ad98705353412d3e21d8b646cb15bb0d',
  callbackURL: 'https://unimapoteca.herokuapp.com/login/facebook/callback',
  profileFields: ['id', 'displayName', 'name', 'photos'],
  enableProof: true
},
  function (accessToken, refreshToken, profile, cb) {

    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;