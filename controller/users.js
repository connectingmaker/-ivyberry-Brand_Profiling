var express = require('express');
var router = express.Router();

var mcode = require("../model/mcode");
var muser = require("../model/muser");
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


    muser.getMemberCount(function(err, count_rows) {
        total = count_rows[0].TOTAL;
        start = viewCnt * (page - 1);


        var boostrapPaginator = new pagination.TemplatePaginator({
            prelink:'/users/list', current: page, rowsPerPage: 10,
            totalResult: total, slashSeparator: true,
            template: function(result) {
                var i, len, prelink;
                var html = '<div><ul class="pagination">';
                if(result.pageCount < 2) {
                    html += '</ul></div>';
                    return html;
                }
                prelink = this.preparePreLink(result.prelink);
                console.log(prelink);
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



        muser.getMemberList(start, function(err, rows) {
            if(err) {
                console.log(err);
            }
            var userData = rows;
            res.render('users/list', { moment:moment, pageHtml: boostrapPaginator, userData: userData });
        });
    });
});



router.get('/write', function(req, res) {
    mcode.getCodeGradeList(function(err, rows) {
        if(err) {
            console.log(err);
        }
        var gradelist = rows;
        var userData = {
            uid: ""
            , username: ""
            , code_grade: ""
            , useremail: ""
            , sex: ""
            , birthday: ""
            , point: ""
            , last_login: ""
        };
        res.render('users/write', { gradelist : gradelist, userData: userData });
    });

});
router.get('/write/:code', function(req, res) {
    var uid = req.params.code;
    mcode.getCodeGradeList(function(err, grade_row) {
        var gradelist = grade_row;
        muser.getMemberSelect(uid, function (err, rows) {
            var uid = rows[0].UID;
            var username = rows[0].USERNAME;
            var code_grade = rows[0].CODE_GRADE;
            var useremail = rows[0].USEREMAIL;
            var sex = rows[0].SEX;
            var birthday = rows[0].BIRTHDAY;
            var point = rows[0].POINT;
            var last_login = rows[0].LAST_LOGIN;

            var userData = {
                uid: uid
                , username: username
                , code_grade: code_grade
                , useremail: useremail
                , sex: sex
                , birthday: birthday
                , point: point
                , last_login: last_login
            };

            res.render('users/write', { gradelist : gradelist, userData: userData });

        });
    });
});

router.post("/writeProcess", function(req, res) {
    var uid = req.body.uid;
    var code_grade = req.body.code_grade;
    var username = req.body.username;
    var useremail = req.body.useremail;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var userphone = req.body.userphone;
    var userpasswd = req.body.userpasswd;

    muser.sp_MEMBER_SAVE(uid, code_grade, username, useremail, userphone, userpasswd, sex, birthday, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        console.log(dataJson);
        res.send(dataJson);
    });
});

router.post("/emailCheck", function(req, res) {
    var useremail = req.body.useremail;
    muser.getEmailCount(useremail, function(err, rows) {
        var dataJson = {
            total : rows[0].TOTAL
        };
        res.send(dataJson);
    });

});

router.get('/22222', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
