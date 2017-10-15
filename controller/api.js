/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');

var router = express.Router();


var mapi = require("../model/mapi");
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

module.exports = router;