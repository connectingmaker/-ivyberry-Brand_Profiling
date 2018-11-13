/**
 * Created by jccho on 2018. 7. 31..
 */
var express = require('express');
var router = express.Router();
var path = require('path');

var mcontent = require("../model/mcontent");
var moment = require('moment');
var pagination = require('pagination');

var mkdirp = require('mkdirp');

var multer = require('multer');//업로드를 위한 multer를 가져옴
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDay();

        mkdirp('public/uploads/'+year+'/'+month+'/'+day, function (err) {
            if (err) console.error(err)
            cb(null, 'public/uploads/'+year+'/'+month+'/'+day)
        });

    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
    }
});

var upload = multer({storage:storage});//uploads라는 폴더가 업로드 폴더임
var fs = require('fs');

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

    res.render('content/write', {title: 'Express',moment: moment,seq: "", subject: "",subject_en: "",subject_cn: "", contents:"",contents_en:"",contents_cn:"", insert_datetime: "", use_yn: ""});

});

router.get('/write/:code', function(req, res, next) {
    var seq = req.params.code;

    mcontent.get_content_select(seq, function(err, content_rows){
        var subject = content_rows[0].SUBJECT;
        var subject_en = content_rows[0].SUBJECT_EN;
        var subject_cn = content_rows[0].SUBJECT_CN;
        var contents = content_rows[0].CONTENTS;
        var contents_en = content_rows[0].CONTENTS_EN;
        var contents_cn = content_rows[0].CONTENTS_CN;
        var filename = content_rows[0].FILEIMG;
        var insert_datetime = content_rows[0].INSERT_DATETIME;
        var use_yn = content_rows[0].USE_YN;
        console.log(content_rows[0]);

        res.render('content/write', { moment: moment, seq: seq, subject: subject,subject_en: subject_en,subject_cn: subject_cn, contents:contents,contents_en:contents_en,contents_cn:contents_cn, insert_datetime: insert_datetime, filename: filename, use_yn: use_yn});
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
    var subject_en = req.body.subject_en;
    var subject_cn = req.body.subject_cn;
    var contents = req.body.contents;
    var contents_en = req.body.contents_en;
    var contents_cn = req.body.contents_cn;

    var use_yn = req.body.use_yn;
    var tempImg = req.body.tempImg;

    var fileimg = "";

    if(tempImg != "") {
        fileimg = tempImg;
    }
    //
    // console.log("user_yn");
    // console.log(use_yn);

    mcontent.sp_CONTENT_SAVE(seq, subject, subject_en,subject_cn,fileimg,contents,contents_en,contents_cn,use_yn, function(err, rows) {
        if(err) {
            console.log(err);
        }

        // var objToJson = rows[0];
        // var dataJson = JSON.stringify(objToJson);
        res.redirect("/content/list");
    });
});

router.post('/writeProcess',upload.single('title_img'), function(req, res) {
    var seq = req.body.seq;
    var subject = req.body.subject;
    var subject_en = req.body.subject_en;
    var subject_cn = req.body.subject_cn;
    var contents = req.body.contents;
    var contents_en = req.body.contents_en;
    var contents_cn = req.body.contents_cn;

    var use_yn = req.body.use_yn;
    var tempImg = req.body.tempImg;

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDay();


    var fileimg =  year + '/' + month + '/' + day + '/' +req.file.filename;

    if(req.file.filename == "") {
        fileimg = tempImg;
    }
    //
    // console.log("user_yn");
    // console.log(use_yn);

    mcontent.sp_CONTENT_SAVE(seq, subject, subject_en,subject_cn,fileimg,contents,contents_en,contents_cn,use_yn, function(err, rows) {
        if(err) {
            console.log(err);
        }

        // var objToJson = rows[0];
        // var dataJson = JSON.stringify(objToJson);
        res.redirect("/content/list");
    });
});

module.exports = router;
