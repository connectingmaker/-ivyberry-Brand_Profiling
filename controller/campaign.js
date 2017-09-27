/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();

var mbrand = require("../model/mbrand");
var mcampaign = require("../model/mcampaign");
var moment = require('moment');


router.get('/list', function(req, res, next) {
    mcampaign.get_campaign_list("N", function(err, rows) {
        var campaignlist = rows;
        res.render('campaign/list', { moment: moment, campaignlist : campaignlist });
    });

});

router.get('/write', function(req, res) {
    mbrand.get_BrandCategoryList_BRAND(function(err,rows) {
        var brandlist = rows;
        res.render('campaign/write', { moment: moment, brandlist: brandlist , campaign_code: "", campaign_title: "", campaign_desc:"", category_code : "", campaign_startdate: "", campaign_enddate: ""});
    });

});

router.get('/write/:code', function(req, res) {
    var campaign_code = req.params.code;

    mbrand.get_BrandCategoryList_BRAND(function(err,rows) {
        var brandlist = rows;
        mcampaign.get_campaign_select(campaign_code, function(err, campaign_rows){
            //var campaignlist = campaign_rows[0];
            var campaign_title = campaign_rows[0].CAMPAIGN_TITLE;
            var campaign_desc = campaign_rows[0].CAMPAIGN_DESC;
            var category_code = campaign_rows[0].CATEGORY_CODE;
            var campaign_startdate = campaign_rows[0].CAMPAIGN_STARTDATE;
            var campaign_enddate = campaign_rows[0].CAMPAIGN_ENDDATE;
            console.log(campaign_rows[0]);

            res.render('campaign/write', { moment: moment, brandlist: brandlist, campaign_code: campaign_code, campaign_title: campaign_title, campaign_desc:campaign_desc, category_code : category_code, campaign_startdate: campaign_startdate, campaign_enddate: campaign_enddate});
        });

    });

});

router.post('/writeProcess', function(req, res) {
    var campaign_code = req.body.campaign_code;
    var campaign_title = req.body.campaign_title;
    var campaign_desc = req.body.campaign_desc;
    var campaign_startdate = req.body.campaign_startdate;
    var campaign_enddate = req.body.campaign_enddate;
    var category_code = req.body.category_code;

    var startdate_timesteamp = new Date(campaign_startdate).getTime() / 1000.0;
    var enddate_timesteamp = new Date(campaign_enddate).getTime() / 1000.0;


    mcampaign.sp_CAMPAIGN_SAVE(campaign_code, campaign_title, campaign_desc, startdate_timesteamp, enddate_timesteamp, category_code, function(err, rows) {
        if(err) {
            console.log(err);
        }


        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        console.log(dataJson);
        res.send(dataJson);
    });
});

router.get('/brand/:code', function(req, res) {
    var campaign_code = req.params.code;
    mcampaign.get_campaign_select(campaign_code, function(err, rows) {
        var campaign = rows[0];
        mbrand.sp_CAMPAIGN_BRAND_LIST(campaign_code, function(err, rows) {
            var brandlist = rows[0];

            var brandTitle;
            if(brandlist.length > 0) {
                brandTitle = brandlist[0].BRAND_NAME_KO;
            }



            res.render('campaign/brand', { campaign_code: campaign_code, moment: moment, campaign : campaign, brandTitle:brandTitle, brandlist : brandlist });
        });
    });
});

router.get('/brandPool/:code', function(req, res) {
    res.render('campaign/brandPool');
});

router.post("/brandProcess", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var visual_yn = req.body.visual_yn;
    var brandList = req.body.brandList;
    var err;
    var jsonData;

    mcampaign.set_campaign_virtual(campaign_code, visual_yn, function(err, rows) {
        if(err) {
            console.log(err);
            err = "DB_ERROR_VIRTUAL";

            jsonData = {
                err: err
            };

            res.send(jsonData);
        }

        mcampaign.sp_CAMPAIGN_BRAND_SUB_SAVE(campaign_code, brandList, function(err, rows) {
            if(err) {
                console.log(err);
                err = "DB_ERROR_VIRTUAL";

                jsonData = {
                    err: err
                };

                res.send(jsonData);
            }
            jsonData = {
                err: "000"
            };

            res.send(jsonData);

        });
    });

});

module.exports = router;