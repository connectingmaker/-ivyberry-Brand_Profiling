var express = require('express');
var router = express.Router();

/* GET admin login page */
router.get('/login', function(req, res, next) {
    res.render('admin/login');
});

module.exports = router;
