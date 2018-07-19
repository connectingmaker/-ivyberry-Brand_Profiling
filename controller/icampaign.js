/**
 * Created by kwangheejung on 2017. 9. 20..
 */
const express = require('express');
const router = express.Router();
const moment = require('moment');
const pagination = require('pagination');
const mcampaign = require("../model/mcampaign");
const micampaign = require("../model/micampaign");



router.get("/list/:bpType", function(req, res) {
    var type = req.query.type;
    var sorting = req.query.sorting;
    var sortingtype = req.query.sortingtype;
    var bpType = req.params.bpType;
    if(type == undefined) {
        type = "";
    }

    if(sorting == undefined) {
        sorting = "";
    }

    if(sortingtype == undefined) {
        sortingtype = "";
    }

    var page = req.query.page;
    var searchName = req.query.searchName;
    if(page == undefined) {
        page = 1;
    }

    if(searchName == undefined) {
        searchName = "";
    }

    var total = 0;
    var start = 0;
    var viewCnt = 30;

    if(type == "HIDE") {
        micampaign.get_campaign_count_hide(searchName, bpType, function (err, count_rows) {

            total = count_rows[0].TOTAL;
            start = viewCnt * (page - 1);

            var boostrapPaginator = new pagination.TemplatePaginator({
                prelink: '/users/list', current: page, rowsPerPage: 30,
                totalResult: total, slashSeparator: true,
                template: function (result) {
                    var i, len, prelink;
                    var html = '<div><ul class="pagination">';
                    if (result.pageCount < 2) {
                        html += '</ul></div>';
                        return html;
                    }
                    prelink = this.preparePreLink(result.prelink);
                    if (result.previous) {
                        html += '<li><a href="./?page=' + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
                    }
                    if (result.range.length) {
                        for (i = 0, len = result.range.length; i < len; i++) {
                            if (result.range[i] === result.current) {
                                html += '<li class="active"><a href="?page=' + result.range[i] + '&type=' + type + '&sorting='+sorting+'&sortingtype='+sortingtype+'">' + result.range[i] + '</a></li>';
                            } else {
                                html += '<li><a href="?page=' + result.range[i] + '&type=' + type + '&sorting='+sorting+'&sortingtype='+sortingtype+'">' + result.range[i] + '</a></li>';
                            }
                        }
                    }
                    if (result.next) {
                        html += '<li><a href="?page=' + result.next + '&type=' + type + '&sorting='+sorting+'&sortingtype='+sortingtype+'" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                    }
                    html += '</ul></div>';
                    return html;
                }
            });


            micampaign.get_campaign_list_hide(start, searchName, sorting, sortingtype, bpType, function (err, rows) {
                var campaignlist = rows;
                res.render('icampaign/list', {
                    moment: moment,
                    campaignlist: campaignlist,
                    type: type,
                    pageHtml: boostrapPaginator,
                    sorting: sorting,
                    sortingtype: sortingtype,
                    bpType: bpType

                });
            });


        });
    } else {
        micampaign.get_campaign_count(type, searchName, bpType, function (err, count_rows) {

            total = count_rows[0].TOTAL;
            start = viewCnt * (page - 1);

            var boostrapPaginator = new pagination.TemplatePaginator({
                prelink: '/users/list', current: page, rowsPerPage: 30,
                totalResult: total, slashSeparator: true,
                template: function (result) {
                    var i, len, prelink;
                    var html = '<div><ul class="pagination">';
                    if (result.pageCount < 2) {
                        html += '</ul></div>';
                        return html;
                    }
                    prelink = this.preparePreLink(result.prelink);
                    if (result.previous) {
                        html += '<li><a href="./?page=' + result.previous + '&sorting='+sorting+'&sortingtype='+sortingtype+'">' + this.options.translator('PREVIOUS') + '</a></li>';
                    }
                    if (result.range.length) {
                        for (i = 0, len = result.range.length; i < len; i++) {
                            if (result.range[i] === result.current) {
                                html += '<li class="active"><a href="?page=' + result.range[i] + '&type=' + type + '&sorting='+sorting+'&sortingtype='+sortingtype+'">' + result.range[i] + '</a></li>';
                            } else {
                                html += '<li><a href="?page=' + result.range[i] + '&type=' + type + '&sorting='+sorting+'&sortingtype='+sortingtype+'">' + result.range[i] + '</a></li>';
                            }
                        }
                    }
                    if (result.next) {
                        html += '<li><a href="?page=' + result.next + '&type=' + type + '&sorting='+sorting+'&sortingtype='+sortingtype+'" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                    }
                    html += '</ul></div>';
                    return html;
                }
            });


            micampaign.get_campaign_list(type, start, searchName, sorting, sortingtype, bpType, function (err, rows) {
                var campaignlist = rows;
                res.render('icampaign/list', {
                    moment: moment,
                    campaignlist: campaignlist,
                    type: type,
                    pageHtml: boostrapPaginator,
                    sorting: sorting,
                    sortingtype: sortingtype,
                    bpType: bpType


                });
            });


        });
    }
});

router.get("/write/:bpType", function(req, res) {
    var campaign_code = req.params.campaign_code;
    var bpType = req.params.bpType;


    res.render('icampaign/write', { campaign_code : campaign_code, campaign_title: '', campaign_title_en: '', campaign_title_cn: '', campaign_desc: '', campaign_desc_en: '', campaign_desc_cn: '', campaign_startdate:'', campaign_enddate: '', moment: moment, bpType: bpType });
});

router.get("/write/:bpType/:campaign_code", function(req, res) {
    var campaign_code = req.params.campaign_code;
    var bpType = req.params.bpType;


    res.render('icampaign/write', { campaign_code : campaign_code, campaign_title: '', campaign_title_en: '', campaign_title_cn: '', campaign_desc: '', campaign_desc_en: '', campaign_desc_cn: '', campaign_startdate:'', campaign_enddate: '', moment: moment, bpType: bpType });
});

router.put("/write", function(req, res) {

});



router.post("/write", function(req, res) {
    // campaign_code : this.formData.campaign_code
    //     ,campaign_title : this.formData.campaign_title
    //     ,campaign_title_en : this.formData.campaign_title_en
    //     ,campaign_title_cn : this.formData.campaign_title_cn
    //     ,campaign_desc : this.formData.campaign_desc
    //     ,campaign_desc_en : this.formData.campaign_desc_en
    //     ,campaign_desc_cn : this.formData.campaign_desc_cn
    //     ,startdate : $("#campaign_startdate").val()
    //     ,enddate : $("#campaign_enddate").val()
    //     ,startPage : $('#startPage').code()
    //     ,joinCnt : this.formData.joinCnt
    //     ,totalPoint : this.formData.totalPoint
    //     ,finishPoint : this.formData.finishPoint

    const campaign_code = req.body.campaign_code;
    const campaign_title = req.body.campaign_title;
    const campaign_title_en = req.body.campaign_title_en;
    const campaign_title_cn = req.body.campaign_title_cn;
    const campaign_desc = req.body.campaign_desc;
    const campaign_desc_en = req.body.campaign_desc_en;
    const campaign_desc_cn = req.body.campaign_desc_cn;
    const campaign_startdate = req.body.startdate;
    const campaign_enddate = req.body.enddate;
    const campaign_startPage = req.body.startPage;
    const joinCnt = req.body.joinCnt;
    const totalPoint = req.body.totalPoint;
    const finishPoint = req.body.finishPoint;
    var bpType = req.body.bpType;

    switch(bpType) {
        case "bp2":
            bpType = "A000";
            break;
        case "bp3":
            bpType = "B000";
            break;
    }

    var startdate_timesteamp = new Date(campaign_startdate).getTime() / 1000.0;
    var enddate_timesteamp = new Date(campaign_enddate).getTime() / 1000.0;


    micampaign.sp_BP3_CAMPAIGN_SAVE(campaign_code, campaign_title, campaign_title_en, campaign_title_cn, campaign_desc, campaign_desc_en, campaign_desc_cn, startdate_timesteamp, enddate_timesteamp, bpType, joinCnt, totalPoint, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var objToJson = rows[0];

        micampaign.sp_BP3_CAMPAIGN_POINT(objToJson[0].CAMPAIGN_CODE, finishPoint, function(err, rows) {
            micampaign.sp_BP3_CAMPAIGN_STARTPAGE(objToJson[0].CAMPAIGN_CODE, campaign_startPage, function(err, rows) {
                res.send(objToJson);
            });
        });

        // var objToJson = rows[0];
        // var dataJson = JSON.stringify(objToJson);
        // console.log(dataJson);
        // res.send(dataJson);
    });

});

router.get("/sqWrite/:campaign_code", function(req, res) {
    var campaign_code = req.params.campaign_code;


    res.render("icampaign/sqWrite", { campaign_code : campaign_code });
});

router.put("/sqWrite", function(req, res) {
    var campaign_code = req.body.campaign_code;

    micampaign.get_BP3_SQ_QUESTION_Q_LIST(campaign_code, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var qData = rows;
        res.send(qData);

    });

});

router.post("/sqScout", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var sqCode = req.body.sqCode;
    var sqaCode = req.body.sqaCode;
    var sqaSCOUT = req.body.sqLayout;
});

router.delete("/sqDeleteQ", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var sqCode = req.body.sqCode;

    micampaign.sp_BP3_SQ_QUESTION_Q_DELETE(campaign_code, sqCode, function(err, rows) {
        var json = {
            ERR_CODE : "000"
            ,ERR_MSG : "OK"
        };
        
        res.send(json);
    });
});

router.delete("/sqDeleteQA", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var sqCode = req.body.sqCode;
    var sqaCode = req.body.sqaCode;
    console.log("OK");

    micampaign.delete_BP3_SQ_QUESTION_QA_DELETE(campaign_code, sqCode, sqaCode, function(err, rows) {
        var json = {
            ERR_CODE : "000"
            ,ERR_MSG : "OK"
        };


        res.send(json);
    });
});

router.post("/sqWrite", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var sqCode = req.body.sqCode;
    var sqTitle = req.body.sqTitle;
    var sqLayout = req.body.sqLayout;
    var sqCheckMin = req.body.sqCheckMin;
    var sqCheckMax = req.body.sqCheckMax;
    var sqaList = req.body.sqaList;
    sqaList = JSON.parse(sqaList);

    micampaign.sp_BP3_SQ_QUESTION_Q_SAVE(campaign_code, sqCode, sqTitle, sqLayout, sqCheckMin, sqCheckMax, function(err, rows) {
        if(err) {
            console.log(err);
        }


        var data = rows[0][0];
        micampaign.sp_BP3_SQ_QUESTION_QA_SAVE(campaign_code, data.SQ_CODE, sqaList, function(err, rows) {

            micampaign.get_BP3_SQ_QUESTION_Q_SELECT(campaign_code, data.SQ_CODE, function(err, rows) {
                var sqData = rows[0];

                res.send(sqData);
            });
            //console.log("OK");
            //res.send(data);

        });


    });
});

router.get("/resultSetting/:campaign_code", function(req, res) {
    var campaign_code = req.params.campaign_code;

    res.render('icampaign/resultSetting', { campaign_code : campaign_code });
});

router.get("/qWrite/:campaign_code", function(req, res) {
    var campaign_code = req.params.campaign_code;

    res.render('icampaign/qWrite', { campaign_code : campaign_code });
});

module.exports = router;