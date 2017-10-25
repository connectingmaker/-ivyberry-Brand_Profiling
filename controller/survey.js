var express = require('express');

var router = express.Router();

router.get("/page/:code", function(req, res) {
    var page = req.body.code;


    console.log(page);

    res.render('survey/multiType', {layout: 'layout/single_page', "layout extractScripts": true });
});


module.exports = router;
