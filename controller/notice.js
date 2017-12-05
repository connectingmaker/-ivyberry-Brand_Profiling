var express = require('express');
var router = express.Router();

var mnotice = require("../model/mnotice");
var moment = require('moment');
var pagination = require('pagination');

/* GET users listing. */
router.get('/list', function(req, res, next) {

    var page = req.query.page;
    if(page == undefined) {
        page = 1;
    }

    var total = 0;
    var start = 0;
    var viewCnt = 10;


    mnotice.getNoticeCount(function(err, count_rows) {
        total = count_rows[0].TOTAL;
        start = viewCnt * (page - 1);


        var boostrapPaginator = new pagination.TemplatePaginator({
            prelink:'/notice/list', current: page, rowsPerPage: 10,
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
                    html += '<li><a href="./?page=' + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
                }
                if(result.range.length) {
                    for( i = 0, len = result.range.length; i < len; i++) {
                        if(result.range[i] === result.current) {
                            html += '<li class="active"><a href="?page=' + result.range[i] + '">' + result.range[i] + '</a></li>';
                        } else {
                            html += '<li><a href="?page=' + result.range[i] + '">' + result.range[i] + '</a></li>';
                        }
                    }
                }
                if(result.next) {
                    html += '<li><a href="?page=' + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                }
                html += '</ul></div>';
                return html;
            }
        });
        mnotice.get_notice_list(start,function(err, rows) {
            var noticelist = rows;
            console.log(rows);
            res.render('notice/list', { title: 'Express',moment: moment, noticelist : noticelist,pageHtml: boostrapPaginator });
        });

    });



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
