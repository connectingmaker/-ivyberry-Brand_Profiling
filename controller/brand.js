/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();


var mbrand = require("../model/mbrand");
var moment = require('moment');



/**** 브랜드 카테고리 대분류 VIEW *****************/
router.get('/list', function(req, res, next) {

    var data;
    mbrand.get_BrandCategoryList(function(err,rows) {
        if(err) {
            console.log(err);
        }

        console.log(rows);

        res.render('brand/list', { list: rows ,moment : moment });
    });
});


router.get('/detail/:code', function(req, res, next) {
    var category_code = req.params.code;
    console.log(category_code);

    mbrand.get_BrandCategorySelect(category_code, function(err, rows) {
        var category = rows[0];
        mbrand.get_BrandCategoryDetailList(category_code, function(err, detail) {
            var detail = detail;
            res.render('brand/detail', { category : category, detail : detail, moment : moment });
        });

    });
});



router.post('/categorySelect', function(req, res, next) {
    var category_code = req.body.category_code;
    mbrand.get_BrandCategorySelect(category_code, function(err, rows) {

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        console.log(dataJson);
        res.send(dataJson);
    });
});


router.post('/categorySubSelect', function(req, res, next) {
    var detail_category_code = req.body.detail_category_code;
    console.log(detail_category_code);
    mbrand.get_BrandCategorySubSelect(detail_category_code, function(err, rows) {

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        console.log(dataJson);
        res.send(dataJson);
    });
});

/**** 브랜드 카테고리 대분류 추가 프로세스 *****************/
router.post('/categoryWriteSave', function(req, res, next) {
    var category_code = req.body.category_code;
    var category_name_ko = req.body.category_name_ko;
    var category_name_en = req.body.category_name_en;
    var category_name_cn = req.body.category_name_cn;
    var memo = req.body.memo;
    var etc = req.body.etc;


    mbrand.sp_BRAND_CATEGORY_SAVE(category_code, category_name_ko, category_name_en, category_name_cn, memo, etc, function(err, rows) {
        if(err) {
            console.log(err);
        }
        if(rows.length > 0) {
            console.log(rows[0]);
            var objToJson = rows[0];
            var dataJson = JSON.stringify(objToJson);
            res.send(dataJson);
        } else {
            res.send("err");
        }


    });

});
/**** 브랜드 카테고리 대분류 추가 프로세스 END *************/


/**** 브랜드 카테고리 삭제 프로세스 **********************/
router.post("/categoryDelete", function(req, res, next) {
    var category_code = req.body.category_code;
    var data = {};
    mbrand.del_BrandCategory(category_code, function(err, rows) {
        if(err) {
            console.log(err);
        }
        var data = rows[0];
        data = {
            category_code : category_code
            ,ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
        };

        res.send(data)
    });
});
/**** 브랜드 카테고리 삭제 프로세스 END ****************/


/**** 브랜드 서브 카테고리 등록 프로세스 **********************/
router.post("/categorySubWriteSave", function(req, res, next) {

    var detail_category_code = req.body.detail_category_code;
    var category_code = req.body.category_code;
    var brand_name_ko = req.body.brand_name_ko;
    var brand_name_en = req.body.brand_name_en;
    var brand_name_cn = req.body.brand_name_cn;
    var memo = req.body.memo;
    var etc = req.body.etc;
    console.log(req.body);

    mbrand.sp_BRAND_CATEGORY_SUB_SAVE(detail_category_code, category_code, brand_name_ko, brand_name_en, brand_name_cn, etc, memo, function(err, rows) {
        if(err) {
            console.log(err);
        }
        if(rows.length > 0) {

            console.log(rows[0]);
            var objToJson = rows[0];
            var dataJson = JSON.stringify(objToJson);
            res.send(dataJson);
        } else {
            res.send("err");
        }
    });

});

/**** 브랜드 중분류 삭제 프로세스 **********************/
router.post("/categorySubDelete", function(req, res, next) {
    var detail_category_code = req.body.detail_category_code;
    var data = {};
    mbrand.del_BrandCategorySub(detail_category_code, function(err, rows) {
        if(err) {
            console.log(err);
        }

        data = {
            detail_category_code : detail_category_code
        };

        res.send(data)
    });
});
/**** 브랜드 중분류 삭제 프로세스 END ****************/

module.exports = router;
