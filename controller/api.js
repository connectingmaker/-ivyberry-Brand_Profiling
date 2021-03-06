/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');

var router = express.Router();


var mapi = require("../model/mapi");
var muser = require("../model/muser");
var moment = require('moment');



/****************** 회원 이메일 및 패스워드 조회 ***************************/
router.post("/userCheck", function(req, res, next) {
    /*
    console.log(req.body);
    console.log(req.params);
    */
    var emailString = req.body.emailString;



    mapi.userCheck(emailString, "", function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);

    });
});


/****************** 핸드폰번호 인증키 발송 ***************************/
router.post("/phoenNumberAuth", function(req, res) {
    var phoneNumber = req.body.phoneNumber;
    mapi.userPhoneAuth(phoneNumber, function(err, rows) {
        if(err){
            console.log(err);
            throw err;
        }

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);
    })
});


/****************** 핸드폰번호 인증키 체크 ***************************/
router.post("/phoneNumberAuthCheck", function(req, res) {
    var phoneNumber = req.body.phoneNumber;
    var authNumber = req.body.authNumber;
    mapi.userPhoneAuthCheck(phoneNumber, authNumber, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);
    });
});


/****************** 회원등록 ***************************/
router.post("/memberInsert", function(req,res) {
    var code_grade = 0;
    var username = "";
    var useremail = req.body.useremail;
    var userphone = req.body.userphone;
    var userpasswd = req.body.userpasswd;
    var birthday = "";


    muser.sp_MEMBER_SAVE('', code_grade, '', useremail, userphone, userpasswd, 'N', '', 0, function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);
    });
});

router.post("/memberFaceBookCheck", function(req, res) {
    var facebook_id = req.body.facebook_id;
    mapi.getFacebookCheck(facebook_id, function(err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }

        var data = rows;

        res.send(JSON.stringify(data));
    });
});

router.post("/memberFaceBook", function(req, res) {
    var username = req.body.username;
    var useremail = req.body.useremail;
    var userphone = req.body.phone;
    var facebook_id = req.body.facebook_id;
    var userToken = req.body.userToken;
    var os = req.body.os;
    var version = req.body.version;


    if(useremail == undefined) {
        useremail = "";
    }

    if(userphone == undefined) {
        userphone = "";
    }



    mapi.getFacebookCheck(facebook_id, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows;

        if(rows.length == 0) {
            muser.sp_MEMBER_SAVE('', 0, username, useremail, userphone, 'facebook', 'N', '', facebook_id, function(err,rows) {
                if(err) {
                    console.log(err);
                    throw err;
                }


                console.log("가입");
                var objToJson = rows[0];
                var dataJson = JSON.stringify(objToJson);
                console.log(dataJson);
                res.send(dataJson);
            });
        } else {
            var objToJson = data;
            muser.sp_MEMBER_TOKEN(data[0].UID, userToken, os, version, function(err, rows) {
                if(err) {
                    console.log(err);
                }

                console.log("로그인");

                var dataJson = JSON.stringify(objToJson);
                console.log(dataJson);
                res.send(dataJson);
            });

        }


    });

});


/****************** 회원조회 ***************************/
router.post("/memberSelect", function(req, res) {
    var useremail = req.body.useremail;
    var userpasswd = req.body.userpasswd;
    var userToken = req.body.userToken;
    var os = req.body.os;
    var version = req.body.version;

    mapi.userSelect(useremail, userpasswd, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var objToJson = rows[0];
        if(objToJson[0].ERR_CODE != "000") {
            var dataJson = JSON.stringify(objToJson);
            res.send(dataJson);
        } else {
            muser.sp_MEMBER_TOKEN(objToJson[0].UID, userToken, os, version, function(err, rows) {
                if(err) {
                    console.log(err);
                    throw err;
                }
                var dataJson = JSON.stringify(objToJson);
                res.send(dataJson);
            });
        }



    });
});

/****************** 회원조회 ***************************/
router.post("/memberSelectBank", function(req, res) {
    /*
    var useremail = req.body.useremail;
    var userpasswd = req.body.userpasswd;
    */
    var uid = req.body.uid;

    mapi.userPoint(uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var objToJson = rows[0];
        mapi.bankList(function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
            }

            var dataJson = JSON.stringify(objToJson);
            var json = {
                user : objToJson
                ,bank : rows
            }
            res.send(JSON.stringify(json));
        });

    });
});


/****************** 캠페인리스트 ***************************/
router.get("/campaignList/:code", function(req, res) {
    var uid = req.params.code;
    var lang = req.query.lang;

    if(lang == undefined || lang == "") {
        lang = "ko";
    }


    if(lang == "ko") {
        mapi.sp_API_CAMPAIGN_LIST_20181029(uid, function(err, rows) {
            if(err) {
                console.log(err);
                throw err;

            }
            var objToJson = rows[0];
            var dataJson = JSON.stringify(objToJson);
            res.send(dataJson);

        });
    } else {
        var area_code = "";
        if(lang == "en") {
            area_code = "131072";
        }

        if(lang == "zh") {
            area_code = "262144";
        }
        mapi.sp_API_CAMPAIGN_LIST_ENCN_20181029(uid, area_code,function(err, rows) {
            if(err) {
                console.log(err);
                throw err;

            }
            var objToJson = rows[0];
            var dataJson = JSON.stringify(objToJson);
            res.send(dataJson);

        });
    }

});



router.get("/mycampaignList/:code", function(req, res) {
    var uid = req.params.code;
    mapi.mycampaignList(uid, function(err,rows) {
        if(err) {
            console.log(err);
            throw err;

        }
        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);

    });
});

/****************** 포인트 히스토리 ***************************/
router.get("/pointHistory/:code", function(req, res) {
    //var uid = req.body.uid;
    //var code_point = req.body.code_point;
    //var uid = "20170926181112gz0317";
    var uid = req.params.code;
    var code_type = 'IN';

    mapi.userPoint(uid, function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        console.log(rows);

        var userPoint = rows[0][0].POINT;

        mapi.pointHistoryList(uid, code_type, function(err,rows) {
            if(err) {
                console.log(err);
                throw err;
            }

            var objToJson = rows[0];
            var dataJson = JSON.stringify(objToJson);


            mapi.pointHistoryBank(uid, function(err, rows) {
                if(err) {
                    console.log(err);
                    throw err;
                }
                var bankToJson = rows[0];
                var bankJson = JSON.stringify(bankToJson);
                var data = {
                    "userPoint" : userPoint
                    ,"inPointList" : dataJson
                    ,"bankPointList" : bankJson
                };

                res.send(JSON.stringify(data));

            });




        });
    });
});


/****************** 회원조회 ***************************/
router.get("/memberSelect/:code", function(req, res) {
    var uid = req.params.code;
    mapi.sp_API_MEMBER_SELECT(uid, function(err, rows) {
        if(err)
        {
            console.log(err);
            throw err;
        }
        var data = rows[0];

        var json = {
            USERNAME : data[0].USERNAME
            ,USEREMAIL : data[0].USEREMAIL
            ,SEX: data[0].SEX
            ,BRITHDAY: data[0].BRITHDAY
            ,AGE : data[0].AGE
            ,ALL_PUSH_YN : data[0].ALL_PUSH_YN
            ,SURVEY_PUSH_YN : data[0].SURVEY_PUSH_YN
        };

        res.send(json);
    });
});

/****************** 패널 신청 ***************************/
router.post("/panelInsert", function(req,res) {
    var uid = req.body.uid;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;


    muser.sp_PANEL_SAVE(uid, q1, q2, q3, q4, 'N', function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var objToJson = rows[0];
        var json = {
            ERR_CODE : objToJson[0].ERR_CODE
            ,ERR_MSG : objToJson[0].ERR_MSG
        }
        res.send(json);
    });
});


/****************** 패스워드 변경  회원조회 ***************************/
router.post("/pwdUserCheck", function(req, res) {
    var uid = req.body.uid;
    var email = req.body.emailString;
    var phone = req.body.phoneNumber;

    console.log(uid);
    console.log(email);
    console.log(phone);




    mapi.sp_API_PWD_USER_CHECK(uid, email, phone, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];
        var json = {
            ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
        }

        res.send(json);
    });
    /*
    mapi.sp_API_MEMBER_SELECT(uid, function(err, rows) {
        if(err)
        {
            console.log(err);
            throw err;
        }
        var data = rows[0];

        var json = {
            USERNAME : data[0].USERNAME
            ,USEREMAIL : data[0].USEREMAIL
            ,SEX: data[0].SEX
            ,BRITHDAY: data[0].BRITHDAY
            ,AGE : data[0].AGE
        };
        console.log(json);

        res.send(json);
    });
    */
});

router.post("/pwdChange", function(req, res) {
    var uid = req.body.uid;
    var newPw = req.body.newPw;

    mapi.sp_API_PWD_CHANGE(uid, newPw, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];
        var json = {
            ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
        }
        res.send(json);
    });


});

/******** 현금이체 구버전 **********************/
router.post("/pointSend", function(req, res) {
    var cashBankPoint = req.body.cashBankPoint;
    var bankSelect = req.body.bankSelect;
    var cashBankAccount = req.body.cashBankAccount;
    var uid = req.body.uid;


    mapi.sp_API_POINT_BANK(cashBankPoint, bankSelect, cashBankAccount, uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];

        var json = {
            ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
            ,BANK_NAME : data[0].BANK_NAME
            ,BANK_ACCOUNT : data[0].BANK_ACCOUNT
            ,POINT : data[0].POINT
        };

        res.send(JSON.stringify(json));
    });

});

router.post("/pointSend_V1_01", function(req, res) {
    var cashBankPoint = req.body.cashBankPoint;
    var bankSelect = req.body.bankSelect;
    var cashBankAccount = req.body.cashBankAccount;
    var uid = req.body.uid;
    var jumin = req.body.jumin;


    mapi.sp_API_POINT_BANK_V1_01(cashBankPoint, bankSelect, cashBankAccount, uid, jumin, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];

        var json = {
            ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
            ,BANK_NAME : data[0].BANK_NAME
            ,BANK_ACCOUNT : data[0].BANK_ACCOUNT
            ,POINT : data[0].POINT
        };

        res.send(JSON.stringify(json));
    })

});


router.post("/memberEmailSearch", function(req, res) {
    var userphone = req.body.userphone;
    mapi.sp_API_USER_EMAIL_SEARCH(userphone, function (err, rows) {
       if(err) {
           console.log(err);
           throw err;
       }

       var data = rows[0];

       var json = {
           ERR_CODE : data[0].ERR_CODE
           ,ERR_MSG : data[0].ERR_MSG
           ,USEREMAIL : data[0].USEREMAIL
       }

       console.log(json);

       res.send(JSON.stringify(json));

    });
});

router.post("/memberIdPhoneSearch", function(req, res) {
    var email = req.body.useremail;
    var phone = req.body.userphone;
    mapi.sp_API_USER_IDPHONE_SEARCH(email, phone, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];

        var json = {
            ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
            ,AUTHCODE : data[0].RAND_CODE
        }

        console.log(json);

        res.send(json);
    })
});
router.post("/memberPwUpdate", function(req, res) {
    var email = req.body.useremail;
    var phone = req.body.userphone;
    var userpw = req.body.userpw;
    console.log(email + "///" + phone + "///" + userpw);
    mapi.sp_API_USER_PWD_UPDATE(email, phone, userpw, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];

        var json = {
            ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
        }

        console.log(json);

        res.send(json);
    })
});

router.get("/memberDrop/:code", function(req, res) {
    var uid = req.params.code;
    muser.set_dropMember(uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var json = {
            "ERR_CODE" : "000"
            ,"ERR_MSG": "OK"
        }
        res.send(json);
    })
});

router.get("/memberPush/:code", function (req, res) {
    var uid = req.params.code;
    mapi.get_pushSelect(uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var json = {
            allYN : true
            ,surveyYN: true
        }
        if(rows.length == 0) {
            res.send(json);
        } else {
            var allpush = false;
            if(rows[0].ALL_PUSH_YN == "Y") {
                allpush = true;
            } else {
                allpush = false;
            }

            var surveypush = false;
            if(rows[0].SURVEY_PUSH_YN == "Y") {
                surveypush = true;
            } else {
                surveypush = false;
            }
            var json = {
                allYN : allpush
                ,surveyYN: surveypush
            }

            res.send(json);
        }
    });
});

router.get("/notice", function(req, res) {
    mapi.sp_API_NOTICE(function(err, rows) {
        if(err) {
            console.log(err);
        }

        console.log(rows[0]);

        var data = rows[0];
        console.log(data);

        var json = {
            list: data
        };

        res.send(json);
    });
});

router.get("/notice_bp3", function(req, res) {
    mapi.sp_API_NOTICE_BP3(function(err, rows) {
        if(err) {
            console.log(err);
        }

        console.log(rows[0]);

        var data = rows[0];
        console.log(data);

        var json = {
            list: data
        };

        res.send(json);
    });
});

router.get("/contents", function(req, res) {
    mapi.sp_CONTENTS(function(err, rows) {
        if(err) {
            console.log(err);
        }


        var data = rows[0];

        var json = {
            list: data
        };

        res.send(json);
    });
});

router.get("/contentsView/:seq", function(req, res) {
    var seq = req.params.seq;
    var lang = req.query.lang;
    console.log(lang);


    mapi.sp_CONTENTS_SUB(seq, function(err, rows) {
        if(err) {
            console.log(err);
        };

        var contents = rows[0][0];

        //
        res.render('content/contentsView', {
            layout: 'layout/contents_layout',
            "layout extractScripts": true,
            contents : contents,
            lang: lang
        });

    })
});

module.exports = router;