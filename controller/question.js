var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/group', function(req, res, next) {
    res.render('question/group', { title: 'Express' });
});


module.exports = router;
