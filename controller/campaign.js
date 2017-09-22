/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();

var mbrand = require("../model/mbrand");

router.get('/list', function(req, res, next) {
    res.render('campaign/list');
});

router.get('/write', function(req, res) {
    mbrand.get_BrandCategoryList_BRAND(function(err,rows) {
        var brandlist = rows;
        res.render('campaign/write', { brandlist: brandlist});
    });

});

module.exports = router;