var express = require('express');
var router = express.Router();

var mnotice = require("../model/mnotice");
var moment = require('moment');

/* GET users listing. */
router.get('/list', function(req, res, next) {

    mnotice.get_notice_list(function(err, rows) {
        var noticelist = rows;
        console.log(rows);
        res.render('notice/list', { title: 'Express',moment: moment, noticelist : noticelist });
    });

    /*res.render('notice/list', { title: 'Express' });*/
});



router.get('/write/:code', function(req, res, next) {
    var seq = req.params.code;


    var noticelist = rows;
    mnotice.get_notice_select(seq, function(err, notice_rows){
        var campaign_title = notice_rows[0].CAMPAIGN_TITLE;
        var campaign_desc = notice_rows[0].CAMPAIGN_DESC;
        var category_code = notice_rows[0].CATEGORY_CODE;
        var campaign_startdate = notice_rows[0].CAMPAIGN_STARTDATE;
        var campaign_enddate = notice_rows[0].CAMPAIGN_ENDDATE;
        var campaign_ing = notice_rows[0].CAMPAIGN_ING;
        console.log(campaign_rows[0]);

        res.render('notice/write', { moment: moment, brandlist: brandlist, campaign_code: campaign_code, campaign_title: campaign_title, campaign_desc:campaign_desc, category_code : category_code, campaign_startdate: campaign_startdate, campaign_enddate: campaign_enddate, campaign_ing : campaign_ing});
    });


    res.render('notice/write', { title: 'Express' });
});

router.post("/noticeDelete", function(req, res) {
    var seq = req.body.seq;

    mnotice.delnotice(seq, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        console.log(rows);

        var data = rows[0];
        console.log(data);
        var jsonData = {
            seq : seq
            ,ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
        };


        res.send(jsonData);
    });


});

module.exports = router;
