/**
 * Created by jccho on 2018. 7. 13..
 */

var express = require('express');

var router = express.Router();

var mimage = require("../model/mimage");
var moment = require('moment');


router.get("/list", function(req,res) {
    res.render('image/list', {});
});

router.put("/list", function(req, res) {
    const image_category = req.body.image_category;

    mimage.sp_BP3_IMAGE_LIST(image_category, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0];

        res.send(data);
    });
});

router.post("/list", function(req, res) {
    const image_seq = req.body.image_seq;
    const image_category = req.body.image_category;
    const image_title = req.body.image_title;
    const image_filename = req.body.image_filename;

    console.log("OK");

    mimage.sp_BP3_IMAGE_SAVE(image_category, image_title, image_filename, image_seq, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0][0];

        res.send(data);
    });
});

router.delete("/list", function(req, res) {
    const image_seq = req.body.image_seq;

    mimage.sp_BP3_IMAGE_DELETE(image_seq, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0][0];

        res.send(data);
    });
});

module.exports = router;
