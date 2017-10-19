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

    muser.sp_MEMBER_SAVE('', code_grade, '', useremail, userphone, userpasswd, 'N', '', function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);
    });
});


/****************** 회원조회 ***************************/
router.post("/memberSelect", function(req, res) {
    var useremail = req.body.useremail;
    var userpasswd = req.body.userpasswd;

    mapi.userSelect(useremail, userpasswd, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);
    });
});


/****************** 캠페인리스트 ***************************/
router.get("/campaignList", function(req, res) {
    //var uid = req.body.uid;
    var uid = "20170926181112gz0317";
    mapi.campaignList(uid, function(err,rows) {
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
router.get("/pointHistory", function(req, res) {
    //var uid = req.body.uid;
    //var code_point = req.body.code_point;
    var uid = "20170926181112gz0317";
    var code_type = 'IN';

    mapi.userPoint(uid, function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var userPoint = rows[0][0].POINT;
        mapi.pointHistoryList(uid, code_type, function(err,rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            var objToJson = rows[0];
            var dataJson = JSON.stringify(objToJson);
            var data = {
                "userPoint" : userPoint
                ,"inPointList" : dataJson
            };

            res.send(JSON.stringify(data));

        });
    });

});

module.exports = router;