/********* mysql connection module ***********/
var mysql      = require('mysql');
var connection = mysql.createConnection({
        host     : 'carin.c-maker.co.kr',
        user     : 'brand',
        password : 'profiling',
        port     : 3306,
    database : 'brand'
});
/******** mysql connection module end ********/


/* mysql connection */
connection.connect();
/* mysql connection end */


/* nodejs module import */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require("i18n")
/* nodejs module import end */

/* router import */
var index = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
/* router import end */



/* express */
var app = express();
app.use(i18n.init);

/* multi language setting */
i18n.configure({
    locales: ['en', 'ko', 'ch'],
    directory: __dirname + '/locales',
    defaultLocale: 'ko'
});


/* views setting */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* default setting */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* router detail setting import */
app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);

app.use(function (req, res, next) {
    var ko = require("./locales/ko.json");
    res.locals.ko = ko;
    next();
});

/* router detail setting import end */

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


connection.end();