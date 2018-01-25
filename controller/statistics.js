var express = require('express');
var router = express.Router();
var moment = require('moment');


var mquestion = require("../model/mquestion");
var mstatistics = require("../model/mstatistics");
var mcampaign = require("../model/mcampaign");

var pagination = require('pagination');


/* GET users listing. */
router.get('/category', function(req, res, next) {
    res.render('statistics/category', { title: 'Express' });
});


router.get("/campaign", function(req, res) {

    var page = req.query.page;
    if(page == undefined) {
        page = 1;
    }

    var searchName = req.query.searchName;
    if(searchName == undefined) {
        searchName = "";
    }

    var total = 0;
    var start = 0;
    var viewCnt = 40;


    mcampaign.sp_CAMPAIGN_LIST_END_CNT(searchName,function(err,count_rows) {
        var total = count_rows[0][0].TOTAL;

        start = viewCnt * (page - 1);

        var boostrapPaginator = new pagination.TemplatePaginator({
            prelink:'/users/list', current: page, rowsPerPage: 40,
            totalResult: total, slashSeparator: true,
            template: function(result) {
                var i, len, prelink;
                var html = '<div><ul class="pagination">';
                if(result.pageCount < 2) {
                    html += '</ul></div>';
                    return html;
                }
                prelink = this.preparePreLink(result.prelink);
                if(result.previous) {
                    html += '<li><a href="./?page=' + result.previous + '&searchName='+searchName+'">' + this.options.translator('PREVIOUS') + '</a></li>';
                }
                if(result.range.length) {
                    for( i = 0, len = result.range.length; i < len; i++) {
                        if(result.range[i] === result.current) {
                            html += '<li class="active"><a href="?page=' + result.range[i] + '&searchName='+searchName+'">' + result.range[i] + '</a></li>';
                        } else {
                            html += '<li><a href="?page=' + result.range[i] + '&searchName='+searchName+'">' + result.range[i] + '</a></li>';
                        }
                    }
                }
                if(result.next) {
                    html += '<li><a href="?page=' + result.next + '&searchName='+searchName+'" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                }
                html += '</ul></div>';
                return html;
            }
        });


        mcampaign.sp_CAMPAIGN_LIST_END(start, searchName, function(err,rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            var campaignList = rows[0];
            res.render('statistics/campaign', { moment: moment, campaignList: campaignList, pageHtml: boostrapPaginator });
        });
    });


});

router.post('/campaignData', function(req, res) {
    var campaign_code = req.body.campaign_code;
    console.log(campaign_code);

    mcampaign.sp_CAMPAIGN_LIST_END_DATA(campaign_code, function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];
        res.send(data);
    });
});

router.get('/group/:code/:quest_num', function(req, res, next) {
    var campaign_code = req.params.code;
    var quest_num = req.params.quest_num;
    mstatistics.sp_STATISTICS_QUESTION(campaign_code, quest_num, function(err, rows) {
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
