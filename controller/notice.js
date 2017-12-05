var express = require('express');
var router = express.Router();

var mnotice = require("../model/mnotice");
var moment = require('moment');

/* GET users listing. */
router.get('/list', function(req, res, next) {

    mnotice.get_notice_list(function(err, rows) {
        var noticelist = rows;
        console.log(rows);
        res.render('notice/list', { title: 'Express',moment: moment, noticelist : noticelist });
    });

    /*res.render('notice/list', { title: 'Express' });*/
});

router.get('/write', function(req, res) {

    res.render('notice/write', {title: 'Express',moment: moment,seq: "", subject: "", contents:"", insert_datetime: "", use_yn: ""});


});

router.get('/write/:code', function(req, res, next) {
    var seq = req.params.code;

    mnotice.get_notice_select(seq, function(err, notice_rows){
        var subject = notice_rows[0].SUBJECT;
        var contents = notice_rows[0].CONTENTS;
        var insert_datetime = notice_rows[0].INSERT_DATETIME;
        var use_yn = notice_rows[0].USE_YN;
        console.log(notice_rows[0]);

        res.render('notice/write', { moment: moment, seq: seq, subject: subject, contents:contents, insert_datetime: insert_datetime, use_yn: use_yn});
    });


    res.render('notice/write', { title: 'Express' });
});

router.post("/noticeDelete", function(req, res) {
    var seq = req.body.seq;

    mnotice.delnotice(seq, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        console.log(rows);

        var data = rows[0];
        console.log(data);
        var jsonData = {
            seq : seq
            ,ERR_CODE : data[0].ERR_CODE
            ,ERR_MSG : data[0].ERR_MSG
        };


        res.send(jsonData);
    });


});

router.post('/writeProcess', function(req, res) {
    var seq = req.body.seq;
    var subject = req.body.subject;
    var contents = req.body.contents;
    var use_yn = req.body.use_yn;

    console.log(use_yn);

    mnotice.sp_NOTICE_SAVE(seq, subject, contents, use_yn, function(err, rows) {
        if(err) {
            console.log(err);
        }


        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        console.log(dataJson);
        res.send(dataJson);
    });
});

module.exports = router;
