var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/category', function(req, res, next) {
    res.render('statistics/category', { title: 'Express' });
});

router.get('/group', function(req, res, next) {
    res.render('statistics/group', { title: 'Express' });
});

module.exports = router;
