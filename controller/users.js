var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
    res.render('users/list', { title: 'Express' });
});

router.get('/22222', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
