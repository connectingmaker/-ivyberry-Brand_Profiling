var express = require('express');
var router = express.Router();

/* GET admin login page */
router.get('/login', function(req, res, next) {
    res.send('respond with a resource');
    //res.render('index', { title: 'Express' });
});

module.exports = router;
