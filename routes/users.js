var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/11111', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/22222', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
