var express = require('express');
var router = express.Router();

/* admin login */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var adminid = req.body.adminid;
  var adminpw = req.body.adminpw;

  res.send(req.body);
});

module.exports = router;
