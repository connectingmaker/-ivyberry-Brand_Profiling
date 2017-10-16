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

module.exports = router;