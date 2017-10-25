var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notice', function(req, res, next) {
    res.render('notice/notice', { title: 'Express' });
});


module.exports = router;
