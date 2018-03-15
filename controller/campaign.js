/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');
var router = express.Router();

var mbrand = require("../model/mbrand");
var mcampaign = require("../model/mcampaign");
var moment = require('moment');
var nodeExcel = require('excel-export');
var pagination = require('pagination');


router.get('/list', function(req, res, next) {
    var type = req.query.type
    if(type == undefined) {
        type = "";
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
    var viewCnt = 10;

    if(type == "HIDE") {
        mcampaign.get_campaign_count_hide(searchName, function (err, count_rows) {

            total = count_rows[0].TOTAL;
            start = viewCnt * (page - 1);

            var boostrapPaginator = new pagination.TemplatePaginator({
                prelink: '/users/list', current: page, rowsPerPage: 10,
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
                                html += '<li class="active"><a href="?page=' + result.range[i] + '&type=' + type + '">' + result.range[i] + '</a></li>';
                            } else {
                                html += '<li><a href="?page=' + result.range[i] + '&type=' + type + '">' + result.range[i] + '</a></li>';
                            }
                        }
                    }
                    if (result.next) {
                        html += '<li><a href="?page=' + result.next + '&type=' + type + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                    }
                    html += '</ul></div>';
                    return html;
                }
            });


            mcampaign.get_campaign_list_hide(start, searchName, function (err, rows) {
                var campaignlist = rows;
                res.render('campaign/list', {
                    moment: moment,
                    campaignlist: campaignlist,
                    type: type,
                    pageHtml: boostrapPaginator
                });
            });


        });
    } else {
        mcampaign.get_campaign_count(type, searchName, function (err, count_rows) {

            total = count_rows[0].TOTAL;
            start = viewCnt * (page - 1);

            var boostrapPaginator = new pagination.TemplatePaginator({
                prelink: '/users/list', current: page, rowsPerPage: 10,
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
                                html += '<li class="active"><a href="?page=' + result.range[i] + '&type=' + type + '">' + result.range[i] + '</a></li>';
                            } else {
                                html += '<li><a href="?page=' + result.range[i] + '&type=' + type + '">' + result.range[i] + '</a></li>';
                            }
                        }
                    }
                    if (result.next) {
                        html += '<li><a href="?page=' + result.next + '&type=' + type + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                    }
                    html += '</ul></div>';
                    return html;
                }
            });


            mcampaign.get_campaign_list(type, start, searchName, function (err, rows) {
                var campaignlist = rows;
                res.render('campaign/list', {
                    moment: moment,
                    campaignlist: campaignlist,
                    type: type,
                    pageHtml: boostrapPaginator
                });
            });


        });
    }


});

router.post("/listStats", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var status = req.body.status;

    mcampaign.set_campaign_statusUpdate(campaign_code,status, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var json = {
            ERR_CODE : "000"
        }

        res.send(json);
    });
});

router.get('/write', function(req, res) {
    mbrand.get_BrandCategoryList_BRAND(function(err,rows) {
        var brandlist = rows;
        res.render('campaign/write', { moment: moment, brandlist: brandlist , campaign_code: "", campaign_title: "", campaign_desc:"", category_code : "", campaign_startdate: "", campaign_enddate: "", campaign_ing:"N"});
    });

});

router.get('/write/:code', function(req, res) {
    var campaign_code = req.params.code;

    mbrand.get_BrandCategoryList_BRAND(function(err,rows) {
        var brandlist = rows;
        mcampaign.get_campaign_select(campaign_code, function(err, campaign_rows){
            //var campaignlist = campai
            var campaign_title = campaign_rows[0].CAMPAIGN_TITLE;
            var campaign_desc = campaign_rows[0].CAMPAIGN_DESC;
            var category_code = campaign_rows[0].CATEGORY_CODE;
            var campaign_startdate = campaign_rows[0].CAMPAIGN_STARTDATE;
            var campaign_enddate = campaign_rows[0].CAMPAIGN_ENDDATE;
            var campaign_ing = campaign_rows[0].CAMPAIGN_ING;
            console.log(campaign_rows[0]);

            res.render('campaign/write', { moment: moment, brandlist: brandlist, campaign_code: campaign_code, campaign_title: campaign_title, campaign_desc:campaign_desc, category_code : category_code, campaign_startdate: campaign_startdate, campaign_enddate: campaign_enddate, campaign_ing : campaign_ing});
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
    var campaign_code = req.params.code;
    mcampaign.get_campaign_select(campaign_code, function(err, rows) {
        var campaign = rows[0];
        mcampaign.sp_CAMPAIGN_BRAND_POOL_LIST(campaign_code, function (err, rows) {
            if (err) {
                console.log(err);
            }
            var brandList = rows[0];
            res.render('campaign/brandPool', {moment: moment, campaign_code: campaign_code, campaign : campaign, brandList: brandList});
        });
    });
});

router.post("/brandPoolProcess", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var brandList = req.body.brandList;
    var err = "";
    var jsonData = {};
    console.log("DATA");

    mcampaign.del_CAMPAIGN_BRAND_POOL(campaign_code, function(err, rows) {
        console.log("성공");
        if(err) {
            console.log(err);
        }

        mcampaign.save_CAMPAIGN_BRAND_POOL_SAVE(campaign_code, brandList, function(err, rows) {
            if(err) {
                console.log(err);
            }

            jsonData = {
                err : "000"
            }

            res.send(jsonData);
        })

    });

    // mcampaign.sp_CAMPAIGN_BRAND_POOL_SAVE(campaign_code, brandList, function(err, rows) {
    //     if(err) {
    //         console.log(err);
    //         err = "err";
    //         jsonData = {
    //             err : "INSERT_DB_ERR"
    //         }
    //         res.send(jsonData);
    //     }
    //
    //     jsonData = {
    //         err : "000"
    //     }
    //
    //     res.send(jsonData);
    //
    //
    // })
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

router.get("/question/:code", function(req, res) {
    var campaign_code = req.params.code;
    mcampaign.get_campaign_select(campaign_code, function(err, rows) {
        var campaign = rows[0];
        mcampaign.sp_CAMPAIGN_QUESTION_GROUP(campaign_code, function (err, rows) {
            var q_group = rows[0];
            res.render("campaign/question", {campaign_code: campaign_code, q_group: q_group, moment: moment, campaign: campaign});
        });
    });

});


router.post("/questionProcess", function(req, res) {
    var quest = eval("("+req.body.quest+")");
    var campaign_code = req.body.campaign_code;
    var data = {};



    mcampaign.del_CAMPAIGN_QUEST(campaign_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;

        }
        if(quest.length == 0) {
            data = {
                err: "000"
            }


            res.send(data);
        } else {
            mcampaign.sp_CAMPAIGN_QUESTION_GROUP_SAVE(quest, function (err, rows) {
                if (err) {
                    console.log(err);
                    throw err;
                    data = {
                        err: "DB_ERR"
                    }
                }

                data = {
                    err: "000"
                }


                res.send(data);
            });
        }
    });



});


router.get("/setting/:code", function(req, res) {
    var campaign_code = req.params.code;
    mcampaign.get_campaign_select(campaign_code, function(err, rows) {
        var campaign_data = rows[0];
        mcampaign.sp_CAMPAIGN_GRADE_COUNT(campaign_code, function(err, rows) {
            if(err){
                console.log(err);
                throw err;
            }

            var gradelist = rows[0];
            mcampaign.sp_CAMPAIGN_QUEST_SETTING_LIST(campaign_code, function(err, rows) {
                var questList = rows[0];

                mcampaign.sp_CAMPAIGN_QUOTA_SEX(campaign_code, function(err, rows) {
                    if(err) {
                        console.log(err);
                        throw err;
                    }
                    var sexQuota = rows[0];
                    mcampaign.sp_CAMPAIGN_QUOTA_AREA(campaign_code, function(err, rows) {
                        if(err) {
                            console.log(err);
                            throw err;
                        }
                        var areaQuota = rows[0];
                        mcampaign.quotaAGESelect(campaign_code, function(err, rows) {
                            if(err) {
                                console.log(err);
                                throw err;
                            }
                            var ageQuota = rows;
                            mcampaign.sp_CAMPAIGN_QUOTA_MONEY(campaign_code, function(err, rows) {
                                if(err) {
                                    console.log(err);
                                    throw err;
                                }
                                var moneyQuota = rows[0];

                                console.log(moneyQuota);


                                res.render("campaign/setting", { campaign_code : campaign_code, campaign_data : campaign_data, gradelist : gradelist, questList: questList, sexQuota: sexQuota, ageQuota:ageQuota, areaQuota: areaQuota, moneyQuota: moneyQuota});
                            });

                        });

                    });
                });


            });

        });
    });
});

router.post("/settingProcess", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var grade_code = req.body.grade_code;
    var join_cnt = req.body.join_cnt;
    var point_limit = req.body.point_limit;
    var startAge = req.body.startAge;
    var endAge = req.body.endAge;
    var area = req.body.area;
    var sex = req.body.sex;
    var money_start = req.body.money_start;
    var money_end = req.body.money_end;


    var questData = eval("("+req.body.questData+")");
    var err = "";

    mcampaign.sp_CAMPAIGN_GRADE_IN_JOIN_CNT_UPDATE(campaign_code, join_cnt, grade_code, point_limit, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;

            err = "DB_ERR";
            var data = {
                err : err
            };
            res.send()
        }
        mcampaign.sp_CAMPAIGN_QUESTION_GROUP_UPDATE(campaign_code, questData, function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
                err = "DB_ERR";
                var data = {
                    err : err
                };
            }

            mcampaign.sp_CAMPAIGN_QUOTA_SAVE(campaign_code, sex, startAge, endAge, area, money_start, money_end, function(err, rows) {
                if(err) {
                    console.log(err);
                    throw err;
                    err = "DB_ERR";
                    var data = {
                        err : err
                    };

                }

                err = "000";
                var data = {
                    err : err
                };

                res.send(data);
            });


        })

    });



});

router.post("/campaignDelete", function(req, res) {
    var campaign_code = req.body.campaign_code;

    mcampaign.delCampaign(campaign_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }


        var data = rows[0];
        var jsonData = {
            campaign_code : campaign_code
            ,ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
        };


        res.send(jsonData);
    });


});

router.post("/campaignHidden", function(req, res) {
    var campaign_code = req.body.campaign_code;


    mcampaign.hiddenCampaign(campaign_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var jsonData = {
            campaign_code : campaign_code
        };



        res.send(jsonData);
    });


});

router.get("/joinUser/:campaign_code/:quest_num", function(req, res) {
    var campaign_code = req.params.campaign_code;
    var quest_num = req.params.quest_num;

    mcampaign.get_campaign_select(campaign_code, function(err,row) {
        console.log(row);
        if(err) {
            console.log(err);
            throw err;
        }

        console.log(row);


        var campaign = row[0];
        mcampaign.sp_CAMPAIGN_USER_JOIN_LIST(campaign_code, quest_num, function(err,row) {
            var list = row[0];
            console.log(list);
            res.render('campaign/joinUser', {
                campaign : campaign
                ,list : list
                ,campaign_code: campaign_code
                ,quest_num : quest_num
                ,moment : moment
            });
        });

    });



});


router.get("/campaignRawData/:code/:quest_num", function(req, res) {
    var campaign_code = req.params.code;
    var quest_num = req.params.quest_num;


    mcampaign.sp_CAMPAIGN_RAWDATA(campaign_code, quest_num, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];

        var conf ={};
        conf.name = "mysheet";
        conf.cols = [];

        var dataArry = [];
        if(data.length != 0) {
            data.forEach(function (v, i) {
                var uid = v.UID;
                var username = v.USERNAME;
                var email = v.USEREMAIL;
                var age = v.AGE;
                var sex = v.SEX;
                var city = v.CITY;
                var brand_q = v.BRAND_Q;
                var data_qa = v.DATA_QA;
                var dataArrQA = [];

                dataArrQA.push(uid);
                dataArrQA.push(username);
                dataArrQA.push(email);
                dataArrQA.push(age);
                dataArrQA.push(sex);
                dataArrQA.push(city);

                if (i == 0) {
                    var header_UID = {
                        caption: 'UID',
                        type: 'string'
                    };
                    conf.cols.push(header_UID);

                    var header_USERNAME = {
                        caption: '이름',
                        type: 'string'
                    };
                    conf.cols.push(header_USERNAME);


                    var header_USEREMAIL = {
                        caption: '이메일',
                        type: 'string'
                    };
                    conf.cols.push(header_USEREMAIL);

                    var header_AGE = {
                        caption: '연령',
                        type: 'string'
                    };
                    conf.cols.push(header_AGE);

                    var header_SEX = {
                        caption: '성별',
                        type: 'string'
                    };
                    conf.cols.push(header_SEX);

                    var header_CITY = {
                        caption: '지역',
                        type: 'string'
                    };
                    conf.cols.push(header_CITY);
                    if(uid != null) {
                        var brand_temp = brand_q.split("///");

                        brand_temp.forEach(function (q_data, key) {
                            header_Q = {
                                caption: q_data.replace(",", ""),
                                type: 'string'
                            }

                            conf.cols.push(header_Q);
                        });
                    }
                }
                if(uid != null) {
                    var data_qa_temp = data_qa.split("///");

                    data_qa_temp.forEach(function (qa_data, key) {
                        dataArrQA.push(qa_data.replace(",", ""));
                    });

                    dataArry.push(dataArrQA);
                }
            });

            conf.rows = dataArry;

            var result = nodeExcel.execute(conf);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + campaign_code + "_rawdata.xlsx");
            res.end(result, 'binary');
        } else {
            res.send("데이터가 존재하지 않습니다.");
        }
        /*
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        res.end(result, 'binary');
        */

        /*
        conf.cols = [{
            caption:'string',
            type:'string',
            beforeCellWrite:function(row, cellData){
                return cellData.toUpperCase();
            },
            width:28.7109375
        },{
            caption:'date',
            type:'date',
            beforeCellWrite:function(){
                var originDate = new Date(Date.UTC(1899,11,30));
                return function(row, cellData, eOpt){
                    if (eOpt.rowNum%2){
                        eOpt.styleIndex = 1;
                    }
                    else{
                        eOpt.styleIndex = 2;
                    }
                    if (cellData === null){
                        eOpt.cellType = 'string';
                        return 'N/A';
                    } else
                        return (cellData - originDate) / (24 * 60 * 60 * 1000);
                }
            }()
        },{
            caption:'bool',
            type:'bool'
        },{
            caption:'number',
            type:'number'
        }];
        conf.rows = [
            ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
            ["e", new Date(2012, 4, 1), false, 2.7182],
            ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
            ["null date", null, true, 1.414]
        ];
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        res.end(result, 'binary');
        */



        //console.log(rows[0]);
    });
})

module.exports = router;