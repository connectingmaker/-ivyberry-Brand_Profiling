/**
 * Created by jccho on 2018. 7. 31..
 */
var express = require('express');
var router = express.Router();

var mcontent = require("../model/mcontent");
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

    mcontent.getContentCount(function(err, count_rows) {
        total = count_rows[0].TOTAL;
        start = viewCnt * (page - 1);

        var boostrapPaginator = new pagination.TemplatePaginator({
            prelink:'/content/list', current: page, rowsPerPage: 10,
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
        mcontent.get_content_list(start,function(err, rows) {
            var contentlist = rows;
            //console.log(rows);
            //console.log("list ok");
            res.render('content/list', { title: 'Express',moment: moment, contentlist : contentlist,pageHtml: boostrapPaginator });
        });

    });

});

router.get('/write', function(req, res) {

    res.render('content/write', {title: 'Express',moment: moment,seq: "", subject: "", contents:"", insert_datetime: "", use_yn: ""});

});

router.get('/write/:code', function(req, res, next) {
    var seq = req.params.code;

    mcontent.get_content_select(seq, function(err, content_rows){
        var subject = content_rows[0].SUBJECT;
        var contents = content_rows[0].CONTENTS;
        var insert_datetime = content_rows[0].INSERT_DATETIME;
        var use_yn = content_rows[0].USE_YN;
        console.log(content_rows[0]);

        res.render('content/write', { moment: moment, seq: seq, subject: subject, contents:contents, insert_datetime: insert_datetime, use_yn: use_yn});
    });


    res.render('content/write', { title: 'Express' });
});

router.post("/contentDelete", function(req, res) {
    var seq = req.body.seq;

    mcontent.delcontent(seq, function(err, rows) {
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

    console.log(contents);

    console.log("user_yn");
    console.log(use_yn);

    mcontent.sp_CONTENT_SAVE(seq, subject, contents,use_yn, function(err, rows) {
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
