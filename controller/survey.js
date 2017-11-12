var express = require('express');

var router = express.Router();

var msurvey = require("../model/msurvey");


router.get("/start", function(req, res) {
    var campaign_code = req.param("campaign_code");
    var quest_num = req.param("quest_num");
    var uid = req.param("uid");
    if(campaign_code.trim() == "9999999001") {
        msurvey.surveyStart(campaign_code, uid, quest_num, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            var survey = rows[0];
            res.redirect("/survey/profile?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&seq=" + survey[0]._SEQ+"&step=1");
        });
        //res.redirect("/survey/profile?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num +"&step=1");
    } else {
        msurvey.surveyStart(campaign_code, uid, quest_num, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }

            var survey = rows[0];
            switch (survey[0]._ERR_CODE) {
                case "000":
                    //console.log("OK");
                    res.redirect("/survey/brand?campaign_code=" + campaign_code + "&uid=" + uid + "&quest_num=" + quest_num + "&seq=" + survey[0]._SEQ);
                    /*
                    res.render('survey/start', {
                        layout: 'layout/single_page',
                        "layout extractScripts": true,
                        ERR_CODE: "999"
                    });
                    */

                    break;

                case "999":
                    //console.log("1111");

                    res.render('survey/start', {
                        layout: 'layout/single_page',
                        "layout extractScripts": true,
                        ERR_CODE: "999"
                    });
                    break;
            }
        });
    }
});

router.get("/profile", function(req,res) {
    var campaign_code = req.param("campaign_code");
    var quest_num = req.param("quest_num");
    var uid = req.param("uid");
    var step = req.param("step");

    switch(step) {
        case "1":
            res.render('survey/profile/1', {layout: 'layout/survey_page', "layout extractScripts": true, campaign_code: campaign_code, quest_num: quest_num, uid: uid, step: step});
            break;
        default:
            res.render('survey/profile/'+step, {layout: 'layout/survey_page', "layout extractScripts": true, campaign_code: campaign_code, quest_num: quest_num, uid: uid, step: step});
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
                            ,STEP : step
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
                            ,STEP : step
                        }

                        res.send(json);
                    });
                }

                break;
        }

    });

});

router.get("/brand", function(req, res) {
    var campaign_code = req.param("campaign_code");
    var quest_num = req.param("quest_num");
    var uid = req.param("uid");
    var seq = req.param("seq");


    msurvey.brandList(campaign_code, seq, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var brand = rows[0];
        res.render('survey/brand', {layout: 'layout/survey_page', "layout extractScripts": true, campaign_code: campaign_code, quest_num: quest_num, uid: uid, seq: seq, brand: brand});
    });
});

router.post("/brandProcess", function(req, res) {
    var seq = req.body.seq;
    var uid = req.body.uid;
    var brand = eval("("+req.body.brandData+")");



    msurvey.brandDel(seq, function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        msurvey.brandSave(seq, brand, function(err, rows) {
            var json = {
                ERR_CODE : "000"
            };

            res.send(json);
        });
    });

});

router.get("/page", function(req, res) {

    var campaign_code = req.param("campaign_code");
    var quest_num = req.param("quest_num");
    var uid = req.param("uid");
    var page = req.param("page");
    var seq = req.param("seq");

    console.log(campaign_code + "///" + quest_num + "///" + page);

    msurvey.surveyPage(campaign_code, quest_num, page, function(err, rows) {
        if(err)
        {
            console.log(err);
            throw err;
        }

        var surveyQ = rows[0][0];


        msurvey.surveyQA(surveyQ.Q_CODE, function(err, rows) {
            var surveyQA = rows;

            msurvey.brandListSelect(seq, campaign_code, function(err, rows) {
                if(err) {
                    console.log(err);
                    throw err;
                }
                var brandList = rows[0];

                console.log(brandList);
                res.render('survey/template/'+surveyQ.QUESTION_TYPE
                    , { layout: 'layout/survey_page'
                        , "layout extractScripts": true
                        , campaign_code: campaign_code
                        , quest_num: quest_num
                        , uid: uid
                        , seq: seq
                        , page : page
                        , surveyQ : surveyQ
                        , surveyQA : surveyQA
                        , brandList: brandList
                    });
            });

        });
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
    msurvey.rowDataDel(seq, q_code, function(err, rows) {
        msurvey.multirowData(seq, q_code, qaData, '', quest_num, '5', function(err,rows) {
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

    /*
    msurvey.surveyEnd(campaign_code, quest_num, seq, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0][0];


        res.send("1111");
        console.log(data);
    });
    */
    var json = {
        ERR_CODE : "000"
        ,ERR_MSG : "OK"
    }


    res.render('survey/surveyEnd', {
        layout: 'layout/single_page',
        "layout extractScripts": true,
        ERR_CODE: json.ERR_CODE
        ,ERR_MSG : json.ERR_MSG
        ,SURVEY_TYPE : "END"
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
