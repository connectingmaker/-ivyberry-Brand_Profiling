var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
    res.render('notice/list', { title: 'Express' });
});

router.get('/write', function(req, res, next) {
    res.render('notice/write', { title: 'Express' });
});

module.exports = router;
