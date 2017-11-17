var express = require('express');
var router = express.Router();
var moment = require('moment');


var mquestion = require("../model/mquestion");
var mstatistics = require("../model/mstatistics");
var mcampaign = require("../model/mcampaign");


/* GET users listing. */
router.get('/category', function(req, res, next) {
    res.render('statistics/category', { title: 'Express' });
});


router.get("/campaign", function(req, res) {
    mcampaign.sp_CAMPAIGN_LIST_END(function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var campaignList = rows[0];
        res.render('statistics/campaign', { moment: moment, campaignList: campaignList });
    });

});

router.get('/group/:code', function(req, res, next) {
    var campaign_code = req.params.code;
    mstatistics.sp_STATISTICS_QUESTION(campaign_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var groupList = rows[0];
        res.render('statistics/group', { campaign_code: campaign_code, groupList: groupList });
    })

});

router.get("/groupData/:campaign_code/:group_code", function(req, res) {
    var campaign_code = req.params.campaign_code;
    var group_code = req.params.group_code;

    mstatistics.sp_STATISTICS_QUESTION_GROUP_LIST(campaign_code, group_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];




        res.render("statistics/groupData", {data : data, campaign_code:campaign_code, group_code:group_code });
    });

});

router.post("/groupData", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var group_code = req.body.group_code;
    var q_code = req.body.q_code;

    mstatistics.sp_STATISTICS_QUESTION_GROUP_DATA(campaign_code, group_code, q_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];
        console.log(JSON.stringify(data));

        res.send(data);
    });

});
/*
router.get("/group/:code", function(req, res) {
    var group_code = req.params.code;
    mstatistics.sp_STATISTICS_QUESTION(function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var groupList = rows[0];
        mquestion.getQuestionList(group_code, function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            var qList = rows;
            for(var i = 0; i<qList.length; i++) {
                qList[i].qaData = {
                    "1111" : "1111"
                }
            }

            console.log(qList);
            res.render('statistics/group', { groupList: groupList, qList : qList });

        });

    })
});
*/

router.get("/total/:code", function(req, res) {
    var campaign_code = req.params.code;

    res.render("statistics/total");
})

module.exports = router;
