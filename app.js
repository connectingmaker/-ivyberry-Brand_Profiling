
/* nodejs module import */
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
/* nodejs module import end */




/* router import */
var il18n = require("./i18n")
var index = require('./controller/index');
var brand = require('./controller/brand');
var users = require('./controller/users');
var campaign = require('./controller/campaign');
var question = require("./controller/question");
var statistics = require('./controller/statistics');
/* router import end */



/* express */
var app = express();
app.use(il18n);

/* session setting */
app.use(session({
    secret: '!@#$%brand@@@@@profiling!@#$%',
    resave: false,
    saveUninitialized: true
}));

/* views setting */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ejs-layouts setting
app.set('layout', 'layout/layout');
app.set("layout extractScripts", true);
app.use(expressLayouts);



/* default setting */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', index);
app.use('/users', users);
app.use('/brand', brand);
app.use('/campaign', campaign);
app.use('/question', question);
app.use('/statistics', statistics);





/******* language setting ************/
app.get('/en', function(req, res) {
    res.cookie("lang", "en");
    res.redirect('back');
});

app.get('/ko', function(req, res) {
    res.cookie("lang", "ko");
    res.redirect('back');
});

app.get('/cn', function(req, res) {
    res.cookie("lang", "cn");
    res.redirect('back');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

