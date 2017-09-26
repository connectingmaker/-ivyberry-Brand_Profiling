var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/group', function(req, res, next) {
    res.render('question/group', { title: 'Express' });
});

router.get('/group/detail/:code', function(req, res) {
    var group_code = req.params.code;

    res.render('question/group/detail', { group_code : group_code });
});


module.exports = router;
