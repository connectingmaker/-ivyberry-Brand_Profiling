var express = require('express');
var router = express.Router();

var mcode = require("../model/mcode");
var muser = require("../model/muser");
var moment = require('moment');
var pagination = require('pagination');

var nodeExcel=require('excel-export');
//var dateFormat = require('dateformat');

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
        muser.sp_MEMBER_SELECT(uid, function (err, rows) {
            console.log(rows[0][0]);
            var data = rows[0];
            var uid = data[0].UID;
            var username = data[0].USERNAME;
            var code_grade = data[0].CODE_GRADE;
            var useremail = data[0].USEREMAIL;
            var sex = data[0].SEX;
            var birthday = data[0].BRITHDAY;
            var point = data[0].POINT;
            var phone = data[0].USERPHONE;
            var last_login = data[0].LAST_LOGIN;

            var userData = {
                uid: uid
                , username: username
                , code_grade: code_grade
                , useremail: useremail
                , sex: sex
                , birthday: birthday
                , point: point
                , last_login: last_login
                , phone : phone
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

    muser.sp_MEMBER_SAVE(uid, code_grade, username, useremail, userphone, userpasswd, sex, birthday, '', function(err, rows) {
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

router.post("/userDelete", function(req, res) {
    var uid = req.body.uid;

    muser.sp_MEMBER_DELETE(uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];
        var json = {
            "ERR_CODE" : data[0].ERR_CODE
            ,"ERR_MSG" : data[0].ERR_MSG
        }
        res.send(json);
    })
});


router.get("/pointHistory/:code", function(req, res) {
    var uid = req.params.code;
    var page = req.query.page;

    if(page == undefined) {
        page = 1;
    }



    var total = 0;
    var start = 0;
    var viewCnt = 10;

    muser.getMemberSelect(uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var userdata = rows[0];

        muser.get_pointHistoryCnt(uid, function(err,rows) {
            if(err) {
                console.log(err);
                throw err;
            }

            var total = rows[0].TOTAL;
            start = viewCnt * (page - 1);


            var boostrapPaginator = new pagination.TemplatePaginator({
                prelink:'/users/pointHistory', current: page, rowsPerPage: 10,
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
                        html += '<li><a href="./'+uid+'?page=' + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
                    }
                    if(result.range.length) {
                        for( i = 0, len = result.range.length; i < len; i++) {
                            if(result.range[i] === result.current) {
                                html += '<li class="active"><a href="./'+uid+'?page=' + result.range[i] + '">' + result.range[i] + '</a></li>';
                            } else {
                                html += '<li><a href="./'+uid+'?page=' + result.range[i] + '">' + result.range[i] + '</a></li>';
                            }
                        }
                    }
                    if(result.next) {
                        html += '<li><a href="./'+uid+'?page=' + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                    }
                    html += '</ul></div>';
                    return html;
                }
            });
            muser.get_codePointList(function(err, rows) {
                if(err) {
                    console.log(err);
                    throw err;
                }

                var codeList = rows;
                muser.sp_MEMBER_POINT_HISTORY_LIST(uid, page, function(err, rows) {
                    if(err) {
                        console.log(err);
                        throw err;
                    }
                    var pointList = rows[0];

                    res.render("users/pointHistory", { pageHtml: boostrapPaginator, moment:moment, uid: uid, pointList : pointList, codeList : codeList, userdata: userdata });
                });
            });
        });

    });



});

router.post('/pointProcess', function(req, res, next) {
    var uid = req.body.uid;
    var code_point = req.body.code_point;
    var point = req.body.point;
    var point_msg = req.body.point_msg;
    var err = "";

    muser.sp_MEMBER_POINT_HISTORY_SAVE(uid, point, code_point, point_msg, "", function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
            err = "DB_ERR";
        } else {
            err = "000";


        }

        var data = {
            err : err
        };

        res.send(data);


    });
});

router.get("/pointRequest", function(req, res) {

    var startDay = req.query.startDay;
    var endDay = req.query.endDay;

    if(startDay == undefined) {
        startDay = 0;
    }

    if(endDay == undefined) {
        endDay = 0;
    }

    console.log(startDay);
    console.log(endDay);

    muser.sp_MEMBER_POINT_REQUEST(startDay,endDay,function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var request = rows[0];



        res.render("users/pointRequest", {request : request,moment : moment});

    });

});

router.post("/pointRequestUpdate", function(req, res) {
    var seq = req.body.seq;
    var request = req.body.request;

    muser.set_pointRequestUpdate(seq,request, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];

        var json = {
            "ERR_CODE" : data[0].ERR_CODE
            ,"ERR_MSG" : data[0].ERR_MSG
            ,"CODE_TYPE" : data[0].CODE_TYPE
        }

        res.send(json);
    });
});

router.post('/requestExcel',function(req,res){
    console.log("ok");
    var startDay = req.param("startDay");
    var endDay = req.param("endDay");

    if(startDay == undefined) {
        startDay = 0;
    }

    if(endDay == undefined) {
        endDay = 0;
    }

    var conf={}
    conf.cols=[{
        caption:'UID',
        type:'string',
        width:20
        },
        {
            caption:'NAME',
            type:'string',
            width:20
        },
        {
            caption:'EMAIL',
            type:'string',
            width:20
        },
        {
            caption:'MSG',
            type:'string',
            width:20
        },
        {
            caption:'BANK',
            type:'string',
            width:20
        },
        {
            caption:'COUNT',
            type:'string',
            width:20
        },
        {
            caption:'MONEY',
            type:'string',
            width:20
        },
        {
            caption:'DATE',
            type:'string',
            width:20
        }
    ];


    muser.sp_MEMBER_POINT_REQUEST(startDay,endDay,function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var request = rows[0];

        arr=[];
        for(i=0;i<request.length;i++){
            UID = request[i].UID;
            USERNAME = request[i].USERNAME;
            USEREMAIL = request[i].USEREMAIL;
            POINT_MSG =request[i].POINT_MSG;
            BANK_NAME =request[i].BANK_NAME;
            BANK_NUM =request[i].BANK_NUM;
            POINT =request[i].POINT;
            INSERT_DATETIME =request[i].INSERT_DATETIME;
            requestDownload=[UID,USERNAME,USEREMAIL,POINT_MSG,BANK_NAME,BANK_NUM,POINT,INSERT_DATETIME];
            arr.push(requestDownload);
        }
        conf.rows=arr;

        var result=nodeExcel.execute(conf);
        res.setHeader('Content-Type','application/vnd.openxmlformates');
        res.setHeader("Content-Disposition","attachment;filename="+"pointRequest.xlsx");
        res.end(result,'binary');


    });

});

module.exports = router;
