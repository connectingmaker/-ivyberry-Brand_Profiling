var express = require('express');

var router = express.Router();


var mcampaign = require("../model/mcampaign");
var msurvey = require("../model/msurvey");
var site_url = require("../config/site_url");


router.get("/start", function(req, res) {
    var campaign_code = req.query.campaign_code;
    var quest_num = req.query.quest_num;
    var uid = req.query.uid;
    var debug = req.query.debug;
    var debugurl = "";
    var lang = req.body.lang;


    if(lang == "" || lang == undefined) {
        lang = "ko";
    }

    if(quest_num == undefined) {
        quest_num = "";
    }


    if(debug == "true") {

        debugurl = "&debug=true";
    }
    if(campaign_code.trim() == "9999999001") {

        msurvey.sp_SURVEY_START_20181028(campaign_code, uid, quest_num, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            var survey = rows[0];
            res.redirect("/survey/profile?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&seq=" + survey[0]._SEQ+"&step=1"+debugurl+"&lang="+lang);
        });
        //res.redirect("/survey/profile?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num +"&step=1");
    } else {

        console.log(uid);
        msurvey.sp_SURVEY_START_20181028(campaign_code, uid, quest_num, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }


            var survey = rows[0];
            console.log(survey);
            if(survey[0].CATEGORY_CODE == "A000") {
                if(survey[0].SQ_CODE == 0 && survey[0].Q_CODE == 0) {
                    res.send("질문지가 생성되지 않았습니다.");
                } else {
                    if(survey[0].SQ_CODE > 0) {
                        console.log("SQ");
                        res.redirect("/survey/sq?campaign_code=" + campaign_code + "&uid=" + uid + "&sq_code="+survey[0].SQ_CODE+"&lang="+lang);
                    } else if(survey[0].Q_CODE > 0) {
                        console.log("Q");
                        res.redirect("/survey/q?campaign_code=" + campaign_code + "&uid=" + uid + "&q_code="+survey[0].Q_CODE+"&lang="+lang);
                    } else {
                        console.log("END");
                    }
                }
            } else {
                console.log("OK2");
                switch (survey[0].ERR_CODE) {
                    case "000":
                        if(quest_num == 1) {
                            if(survey[0].BRAND_SKIP == "N") {
                                res.redirect("/survey/brand?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&seq=" + survey[0]._SEQ+debugurl+"&lang="+lang);
                            } else {
                                res.redirect("/survey/page?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&page=1&seq=" + survey[0]._SEQ+debugurl+"&lang="+lang);
                            }

                        } else {
                            res.redirect("/survey/page?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&page=1&seq=" + survey[0]._SEQ+debugurl+"&lang="+lang);
                        }
                        /*
                        res.render('survey/start', {
                            layout: 'layout/single_page',
                            "layout extractScripts": true,
                            ERR_CODE: "999"
                        });
                        */

                        break;

                    case "999":
                        if(debug == "true") {
                            msurvey.sp_RAWDATA_DELETE(campaign_code, uid, quest_num, function(err, rows) {
                                if(err) {
                                    console.log(err);
                                    throw err;
                                }
                                if(quest_num == 1) {
                                    // res.redirect("/survey/brand?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&seq=" + survey[0]._SEQ + debugurl);
                                    if(quest_num == 1) {
                                        if(survey[0].BRAND_SKIP == "N") {
                                            res.redirect("/survey/brand?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&seq=" + survey[0]._SEQ+debugurl+"&lang="+lang);
                                        } else {
                                            res.redirect("/survey/page?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&page=1&seq=" + survey[0]._SEQ+debugurl+"&lang="+lang);
                                        }

                                    } else {
                                        res.redirect("/survey/page?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&page=1&seq=" + survey[0]._SEQ+debugurl+"&lang="+lang);
                                    }
                                } else {
                                    res.redirect("/survey/page?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&page=1&seq=" + survey[0]._SEQ+debugurl+"&lang="+lang);
                                }
                            });
                        } else {
                            res.render('survey/start', {
                                layout: 'layout/single_page',
                                "layout extractScripts": true,
                                ERR_CODE: "999",
                                land: lang

                            });
                        }

                        break;
                    default:
                        res.render('survey/start', {
                            layout: 'layout/single_page',
                            "layout extractScripts": true
                            , ERR_CODE: survey[0].ERR_CODE
                            , ERR_MSG:survey[0].ERR_MSG
                            ,DEBUG: debug,
                            land: lang
                        });
                        break;
                }
            }

        });
    }
});

router.get("/profile", function(req,res) {
    var campaign_code = req.query.campaign_code;
    var quest_num = req.query.quest_num;
    var uid = req.query.uid;
    var step = req.query.step;
    var seq = req.query.seq;
    var debug = req.query.debug;
    var lang = req.query.lang;

    if(debug == undefined) {
        debug = "";
    }

    console.log("OK");

    switch(step) {
        case "1":
            res.render('survey/profile/1', {layout: 'layout/survey_page', "layout extractScripts": true, campaign_code: campaign_code, quest_num: quest_num, uid: uid, seq: seq, step: step, debug : debug, lang : lang});
            break;
        default:
            res.render('survey/profile/'+step, {layout: 'layout/survey_page', "layout extractScripts": true, campaign_code: campaign_code, quest_num: quest_num, uid: uid , seq: seq,  step: step, debug : debug, lang : lang});
            break;
    }
});

router.post("/profileProcess", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var uid = req.body.uid;
    var seq = req.body.seq;
    var quest_num = req.body.quest_num;
    var step = req.body.step;
    var data = req.body.data;


    msurvey.profileCnt(uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }



        switch(step){
            case "1":
                msurvey.profileNameUpdate(uid, data, function(err, rows) {
                    step = 2;
                    if(err) {
                        console.log(err);
                        throw err;
                    }

                    var json = {
                        ERR_CODE: "000"
                        ,STEP : step
                    }

                    res.send(json);


                });
                break;
            case "2":
                if(rows[0].TOTAL == 0) {
                    msurvey.profileSexInsert(uid,data, function(err, rows) {
                        step = 3;
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        var json = {
                            ERR_CODE: "000"
                            ,STEP : step
                        }

                        res.send(json);
                    });
                } else {
                    msurvey.profileSexUpdate(uid,data, function(err, rows) {
                        step = 3;
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        var json = {
                            ERR_CODE: "000"
                            ,STEP : step
                        }

                        res.send(json);
                    });
                }
                break;
            case "3":
                if(rows[0].TOTAL == 0) {
                    msurvey.profileBrithdayInsert(uid,data, function(err, rows) {
                        step = 4;
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        var json = {
                            ERR_CODE: "000"
                            ,STEP : step
                        }

                        res.send(json);
                    });
                } else {
                    msurvey.profileBrithdayUpdate(uid,data, function(err, rows) {
                        step = 4;
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        var json = {
                            ERR_CODE: "000"
                            ,STEP : step
                        }

                        res.send(json);
                    });
                }
                break;
            case "4":
                if(rows[0].TOTAL == 0) {
                    msurvey.profileAreaInsert(uid,data, function(err, rows) {
                        step = 5;
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        var json = {
                            ERR_CODE: "000"
                            ,STEP : step
                        }

                        res.send(json);
                    });
                } else {
                    msurvey.profileAreaUpdate(uid,data, function(err, rows) {
                        step = 5;
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        var json = {
                            ERR_CODE: "000"
                            ,STEP : step
                        }

                        res.send(json);
                    });
                }
                break;
            case "5":
                if(rows[0].TOTAL == 0) {
                    msurvey.profileMoneyInsert(uid,data, function(err, rows) {
                        step = 0;
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        var json = {
                            ERR_CODE: "000"
                            ,STEP : 0
                        }

                        res.send(json);
                    });
                } else {
                    msurvey.profileMoneyUpdate(uid,data, function(err, rows) {
                        step = 0;
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        var json = {
                            ERR_CODE: "000"
                            ,STEP : 0
                        }

                        res.send(json);
                    });
                }

                break;
        }

    });

});

router.get("/brand", function(req, res) {
    var campaign_code = req.query.campaign_code;
    var quest_num = req.query.quest_num;
    var uid = req.query.uid;
    var seq = req.query.seq;
    var debug = req.query.debug;
    var lang = req.query.lang;
    if(debug == undefined) {
        debug = "";
    }

    console.log(campaign_code);


    var title_data = {};

    mcampaign.get_campaign_brand_title(campaign_code, function(err, rows) {
        if(err) {
            console.log(err);
        }

        if(rows.length == 0) {
            var title_data = {};
        } else {
            var title_data = rows[0];
        }

        msurvey.brandList(campaign_code, seq, function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
            }

            var brand = rows[0];
            res.render('survey/brand', {layout: 'layout/survey_page', "layout extractScripts": true, title_data: title_data,campaign_code: campaign_code, quest_num: quest_num, uid: uid, seq: seq, brand: brand, debug : debug, lang: lang});
        });


    });


});

router.post("/brandProcess", function(req, res) {
    var seq = req.body.seq;
    var campaign_code = req.body.campaign_code;
    var uid = req.body.uid;
    var quest_num = req.body.quest_num;
    var brand = eval("("+req.body.brandData+")");

    console.log(campaign_code + "///" + uid + "///" + quest_num);



    msurvey.brandDel(uid, quest_num, campaign_code, function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        msurvey.brandSave(seq, campaign_code, uid, quest_num, brand, function(err, rows) {
            var json = {
                ERR_CODE : "000"
            };

            res.send(json);
        });
    });

});

router.get("/page", function(req, res) {

    var campaign_code = req.query["campaign_code"];
    var quest_num = req.query["quest_num"];
    var uid = req.query["uid"];
    var page = req.query["page"];
    var seq = req.query["seq"];
    var debug = req.query["debug"];
    var lang = req.query["lang"];

    if(debug == undefined) {
        debug = "";
    }



    msurvey.surveyPage(campaign_code, quest_num, page, function(err, rows) {
        if(err)
        {
            console.log(err);
            throw err;
        }



        if(rows[0].length == 0) {
            res.send("설문지가 존재하지 않습니다. 질문세부 비활성 여부를 확인해주세요.");
        } else {

            var surveyQ = rows[0][0];




            msurvey.surveyPageCnt(seq, campaign_code, quest_num, page, function(err, cnt_row) {
                if(err) {
                    console.log(err);
                    throw err;
                }

                var total_per = cnt_row[0][0].TOTAL_PER;





                msurvey.surveyQA(surveyQ.Q_CODE, function(err, rows) {
                    if(err) {
                        console.log(err);
                    }



                    var surveyQA = rows;
                    if(quest_num == 1) {
                        msurvey.brandListSelect(uid, quest_num, campaign_code, function (err, rows) {
                            if(err) {
                                console.log(err);
                            }

                            console.log(rows[0]);

                            var brandList = rows[0];



                            res.render('survey/template/' + surveyQ.QUESTION_TYPE
                                , {
                                    layout: 'layout/survey_page'
                                    , campaign_code: campaign_code
                                    , quest_num: quest_num
                                    , uid: uid
                                    , seq: seq
                                    , page: page
                                    , surveyQ: surveyQ
                                    , surveyQA: surveyQA
                                    , brandList: brandList
                                    , debug: debug
                                    , total_per: total_per
                                    , lang : lang
                                });

                        });
                    } else {

                        msurvey.brandListSelect(uid, 1, campaign_code, function (err, rows) {
                            if(err) {
                                console.log(err);
                            }

                            var brandList = rows[0];




                            res.render('survey/template/' + surveyQ.QUESTION_TYPE
                                , {
                                    layout: 'layout/survey_page'
                                    , campaign_code: campaign_code
                                    , quest_num: quest_num
                                    , uid: uid
                                    , seq: seq
                                    , page: page
                                    , surveyQ: surveyQ
                                    , surveyQA: surveyQA
                                    , brandList: brandList
                                    , debug: debug
                                    , total_per: total_per
                                    , lang : lang
                                });

                        });

                    }


                });
            });
        }
    });

});

router.post("/multiProcess", function(req, res) {
    var campaign_code = req.body.campaign_code;
    var uid = req.body.uid;
    var seq = req.body.seq;
    var quest_num = req.body.quest_num;
    var page = req.body.page;
    var q_code = req.body.q_code;
    var qaData = eval("("+req.body.qaData+")");
    var module_type = req.body.module_type;

    if(module_type == undefined) {
        module_type = "N";
    }
    msurvey.rowDataDel(seq, q_code, function(err, rows) {
        msurvey.multirowData(seq, q_code, qaData, '', quest_num, module_type, function(err,rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            msurvey.surveyPageCheck(campaign_code, quest_num, page, function(err, rows) {
                if(err) {
                    console.log(err);
                    throw err;
                }

                var pageCheck = rows[0][0];
                var err_code = "000";




                var json = {
                    ERR_CODE: err_code
                    ,PAGE : pageCheck.PAGE
                }



                res.send(json);


            });
        });
    });

});

router.get("/surveyEnd", function(req, res) {
    var campaign_code = req.param("campaign_code");
    var quest_num = req.param("quest_num");
    var uid = req.param("uid");
    var seq = req.param("seq");
    var debug = req.param("debug");
    if(debug == undefined){
        debug = "";
    }


    msurvey.surveyEnd(campaign_code, quest_num, seq, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0][0];



        var json = {
            ERR_CODE : data.ERR_CODE
            ,ERR_MSG : data.ERR_MSG
        }




        res.render('survey/surveyEnd', {
            layout: 'layout/single_page',
            "layout extractScripts": true,
            ERR_CODE: json.ERR_CODE
            ,ERR_MSG : json.ERR_MSG
            ,SURVEY_TYPE : "END"
            ,debug : debug
        });
    });


});

router.get("/sq", function(req, res, next) {
    var campaign_code = req.query.campaign_code;
    var uid = req.query.uid;
    var sq_code = req.query.sq_code;




    msurvey.sp_BP3_SQ_QUESTION_Q_SELECT(campaign_code, sq_code, function(err, sq_data) {
        var sq_data_data = sq_data[0][0];
        msurvey.sp_BP3_SQ_QUESTION_QA_LIST(campaign_code, sq_code, function(err, rows) {
            res.render('survey/sq', {
                layout: 'layout/survey_page',
                "layout extractScripts": true,
                "uid": uid,
                "campaign_code": campaign_code,
                "sq_code" : sq_code,
                "sq_data" : sq_data_data,
                "sq_qa" : rows[0]

            });
        });

    });
});

router.post("/sqProcess", function(req, res, next) {
    var campaign_code = req.body.campaign_code;
    var uid = req.body.uid;
    var sq_code = req.body.sq_code;
    var qaData = JSON.parse(req.body.qaData);



    msurvey.sp_BP3_SURVEY_DATA_SQ_DELETE(campaign_code, uid, sq_code, function(err, rows) {
        msurvey.sp_BP3_SURVEY_DATA_SQ_SAVE(campaign_code, uid, sq_code, qaData, function(err, rows) {
            if(err) {
                console.log(err);
            }
            msurvey.sp_BP3_SURVEY_DATA_SQ_NEXT(campaign_code, uid, sq_code, function(err, rows) {

                res.json(rows[0][0]);

            });
        });

    });
});

router.get("/q", function(req, res, next) {
    var campaign_code = req.query.campaign_code;
    var q_code = req.query.q_code;
    var uid = req.query.uid;

    msurvey.sp_BP3_SURVEY_Q_SELECT(campaign_code, q_code, function(err, rows) {

        var q_data = rows[0][0];
        msurvey.sp_BP3_SURVEY_QA_LIST(campaign_code, uid, q_code, function(err, rows) {
            var qalist = rows[0];
            if(q_data.Q_TYPE == 5) {
                msurvey.sp_BP3_SURVEY_QA_IMG_LIST_LR(campaign_code, uid,  q_code, "L", function(err, img_data) {
                    if(err) {
                        console.log(err);
                    }
                    var img_data_l = img_data[0];

                    msurvey.sp_BP3_SURVEY_QA_IMG_LIST_LR(campaign_code, uid,  q_code, "R", function(err, img_data) {
                        var img_data_r = img_data[0];

                        res.render('survey/q', {
                            layout: 'layout/survey_page',
                            "layout extractScripts": true,
                            "uid": uid,
                            "campaign_code": campaign_code,
                            "q_code" : q_code,
                            "q_data" : q_data,
                            "qa" : qalist,
                            "qaImg" : "",
                            "qaImg_l" : img_data_l,
                            "qaImg_r" : img_data_r,
                            "site_url" : site_url.bp3

                        });
                    });

                });
            } else {
                msurvey.sp_BP3_SURVEY_QA_IMG_LIST(campaign_code, uid,  q_code, function(err, img_data) {
                    var imglist = img_data[0];
                    console.log(imglist);
                    console.log(q_data);
                    res.render('survey/q', {
                        layout: 'layout/survey_page',
                        "layout extractScripts": true,
                        "uid": uid,
                        "campaign_code": campaign_code,
                        "q_code" : q_code,
                        "q_data" : q_data,
                        "qa" : qalist,
                        "qaImg" : imglist,
                        "qaImg_l" : [],
                        "qaImg_r" : [],
                        "site_url" : site_url.bp3
                    });
                });
            }

        });
    });

});

router.post("/qProcess", function(req, res, next) {
    var campaign_code = req.body.campaign_code;
    var uid = req.body.uid;
    var q_code = req.body.q_code;
    var qaData = JSON.parse(req.body.qaData);


    msurvey.sp_BP2_SURVEY_Q_DATA_DELETE(campaign_code, uid, q_code, function(err, rows) {
        msurvey.sp_BP2_SURVEY_NEXT_Q(campaign_code, uid, q_code, qaData, function(err, rows) {
            if(err) {
                console.log(err);
            }
            var data = rows[0][0];
            console.log(data);

            res.json(data);
        });

    });
});


router.get("/checkedType/:code", function(req, res) {
    var page = req.body.code;

    console.log(page);

    res.render('survey/checkedType', {layout: 'layout/single_page', "layout extractScripts": true});

});

router.get("/radioType/:code", function(req, res) {
    var page = req.body.code;

    console.log(page);

    res.render('survey/radioType', {layout: 'layout/single_page', "layout extractScripts": true});

});

router.get("/img7scaleType/:code", function(req, res) {
    var page = req.body.code;

    console.log(page);

    res.render('survey/img7scaleType', {layout: 'layout/single_page', "layout extractScripts": true});

});

router.get("/scaleType/:code", function(req, res) {
    var page = req.body.code;

    console.log(page);

    res.render('survey/scaleType', {layout: 'layout/single_page', "layout extractScripts": true});

});

router.get("/imgSelectType/:code", function(req, res) {
    var page = req.body.code;

    console.log(page);

    res.render('survey/imgSelectType', {layout: 'layout/single_page', "layout extractScripts": true});

});

router.get("/imgSelect_Text/:code", function(req, res) {
    var page = req.body.code;

    console.log(page);

    res.render('survey/imgSelect_Text', {layout: 'layout/single_page', "layout extractScripts": true});

});


module.exports = router;
