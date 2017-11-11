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
    mcampaign.get_campaign_list("E", function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var campaignList = rows;
        res.render('statistics/campaign', { moment: moment, campaignList: campaignList });
    });

});

router.get('/group', function(req, res, next) {
    mstatistics.sp_STATISTICS_QUESTION(function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var groupList = rows[0];
        res.render('statistics/group', { groupList: groupList });
    })

});

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

module.exports = router;
