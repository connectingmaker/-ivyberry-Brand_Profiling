/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();

/* brand list */
router.get('/list', function(req, res, next) {
    res.render('users/list', { title: 'Express' });
});

module.exports = router;
