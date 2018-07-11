/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');

var router = express.Router();

var mcode = require("../model/mcode");
var moment = require('moment');



/****************** 이미지DB 카테고리 ***************************/
router.get("/imageCategory", function(req, res) {
    res.render('code/imageCategory', {});

});

/****************** 이미지DB 카테고리 등록 *************************/
router.post("/imageCategory", function(req, res) {
    var category_code = req.body.category_code;
    var category_name = req.body.category_name;

    mcode.sp_BP3_CODE_IMAGE_CATEGORY_SAVE(category_code, category_name, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0][0];
        res.send(data);
    });

});

/**************** 이미지DB LIST *******************************/
router.put("/imageCategory", function(req, res) {
    var category_code = "";
    if(req.body.category_code == undefined) {
        category_code == "";
    } else {
        category_code = req.body.category_code;
    }

    if(category_code == "") {
        mcode.sp_BP3_CODE_IMAGE_CATEGORY_LIST(function(err, rows) {
            if(err) {
                console.log(err);
            }
            var data = rows[0];
            //console.log(data);
            res.send(data);
        });
    } else {
        console.log(category_code);
        mcode.sp_BP3_CODE_IMAGE_CATEGORY_SUB_LIST(category_code, function(err, rows) {
            if(err) {
                console.log(err);
            }
            var data = rows[0];
            console.log(data);
            res.send(data);
        });
    }

});

/****************** 키워드 카테고리 ***************************/
router.get("/keywordCategory", function(req, res) {
    res.render('code/imageCategory', {});

});

/****************** 유사상품DB 카테고리 ***************************/
router.get("/productCategory", function(req, res) {
    res.render('code/imageCategory', {});

});


module.exports = router;