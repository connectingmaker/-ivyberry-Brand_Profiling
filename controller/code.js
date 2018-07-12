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

    console.log(category_code + "///" + category_name);

    mcode.sp_BP3_CODE_IMAGE_CATEGORY_SAVE(category_code, category_name, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0][0];
        res.send(data);
    });

});

/**************** 이미지DB SELECT *******************************/
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
            res.send(data);
        });
    }

});

/**************** 이미지DB 삭제 *******************************/
router.delete("/imageCategory", function(req, res) {
    var category_code = "";
    if(req.body.category_code == undefined) {
        category_code == "";
    } else {
        category_code = req.body.category_code;
    }



    mcode.sp_BP3_CODE_IMAGE_CATEGORY_DELETE(category_code, function(err, rows) {
        if(err) {
            console.log(err);
        }
        var data = rows[0][0];
        res.send(data);
    });


});

/****************** 키워드 카테고리 ***************************/
router.get("/keywordCategory", function(req, res) {
    res.render('code/keywordCategory', {});

});

router.put("/keywordCategory", function(req, res) {
    mcode.sp_BP3_CODE_KEYWORD_CATEGORY_LIST(function(err,rows) {
        if(err) {
            console.log(err);
        }
        //console.log(rows);
        var data = rows[0];
        res.send(data);
    });
});

router.delete("/keywordCategory", function(req, res) {
    const category_code = req.body.category_code;
    mcode.sp_BP3_CODE_KEYWORD_CATEGORY_DELETE(category_code, function(err, rows) {
        if(err) {
            console.log(err);
        }

        const data = rows[0][0];

        res.send(data);
    });
});

router.post("/keywordCategory", function(req, res) {
    const category_code = req.body.category_code;
    const category_name = req.body.category_name;

    mcode.sp_BP3_CODE_KEYWORD_CATEGORY_SAVE(category_code, category_name, function(err, rows) {
        if(err) {
            console.log(err);
        }

        const data = rows[0][0];

        res.send(data);
    });
});

/****************** 트랜드DB 카테고리 ***************************/
router.get("/trendCategory", function(req, res) {
    res.render('code/trendCategory', {});

});


/****************** 트랜드DB LIST ***************************/
router.put("/trendCategory", function(req, res) {
    mcode.sp_BP3_CODE_TREND_CATEGORY_LIST(function(err,rows) {
        if(err) {
            console.log(err);
        }
        //console.log(rows);
        const data = rows[0];
        res.send(data);
    });

});

router.post("/trendCategory", function(req, res) {
    const category_code = req.body.category_code;
    const category_name = req.body.category_name;

    mcode.sp_BP3_CODE_TREND_CATEGORY_SAVE(category_code, category_name, function(err, rows) {
        if(err) {
            console.log(err);
        }

        const data = rows[0][0];

        res.send(data);
    });
});

router.delete("/trendCategory", function(req, res) {
    const category_code = req.body.category_code;

    mcode.sp_BP3_CODE_TREND_CATEGORY_DELETE(category_code, function(err, rows) {
        if(err) {
            console.log(err);
        }

        const data = rows[0][0];

        res.send(data);
    });
});


module.exports = router;