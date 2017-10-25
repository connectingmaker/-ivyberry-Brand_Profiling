var express = require('express');

var router = express.Router();

router.get("/checkedType/:code", function(req, res) {
    var page = req.body.code;


    console.log(page);

    res.render('survey/checkedType', {layout: 'layout/single_page', "layout extractScripts": true});

});

router.get("/radioType/:code", function(req, res) {
    var page = req.body.code;


    console.log(page);

    res.render('survey/radioType', {layout: 'layout/single_page', "layout extractScripts": true});

});

router.get("/img7scaleType/:code", function(req, res) {
    var page = req.body.code;


    console.log(page);

    res.render('survey/img7scaleType', {layout: 'layout/single_page', "layout extractScripts": true});

});

module.exports = router;
