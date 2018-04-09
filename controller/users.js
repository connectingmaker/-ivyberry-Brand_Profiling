var express = require('express');
var router = express.Router();

var mcode = require("../model/mcode");
var muser = require("../model/muser");
var moment = require('moment');
var pagination = require('pagination');

var nodeExcel=require('excel-export');
var commaNumber = require('comma-number')


//var dateFormat = require('dateformat');

/* GET users listing. */


router.get("/static", function(req, res) {
    muser.sp_USERS_STATIC('', '', function(err,rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0];

        res.render('users/static', {staticData:data});
    });

});

router.get('/list', function(req, res, next) {
    var page = req.query.page;
    if(page == undefined) {
        page = 1;
    }

    var searchName = req.query.searchName;
    if(searchName == undefined) {
        searchName = "";
    }

    var total = 0;
    var start = 0;
    var viewCnt = 30;


    muser.sp_MEMBER_TOTAL(function(err, rows) {
        var totalData = rows[0][0];
        muser.getMemberCount(searchName, function(err, count_rows) {
            total = count_rows[0].TOTAL;
            start = viewCnt * (page - 1);


            var boostrapPaginator = new pagination.TemplatePaginator({
                prelink:'/users/list', current: page, rowsPerPage: 30,
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
                        html += '<li><a href="./?page=' + result.previous + '&searchName='+searchName+'">' + this.options.translator('PREVIOUS') + '</a></li>';
                    }
                    if(result.range.length) {
                        for( i = 0, len = result.range.length; i < len; i++) {
                            if(result.range[i] === result.current) {
                                html += '<li class="active"><a href="?page=' + result.range[i] + '&searchName='+searchName+'">' + result.range[i] + '</a></li>';
                            } else {
                                html += '<li><a href="?page=' + result.range[i] + '&searchName='+searchName+'">' + result.range[i] + '</a></li>';
                            }
                        }
                    }
                    if(result.next) {
                        html += '<li><a href="?page=' + result.next + '&searchName='+searchName+'" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                    }
                    html += '</ul></div>';
                    return html;
                }
            });



            muser.getMemberList(start, searchName, function(err, rows) {
                if(err) {
                    console.log(err);
                }
                var userData = rows;
                res.render('users/list', { moment:moment, pageHtml: boostrapPaginator, userData: userData, totalData: totalData, searchName : searchName });
            });
        });
    });

});

router.get("/excelDown", function(req, res) {
    var searchName = req.query.searchName;
    if(searchName == undefined) {
        searchName = "";
    }

    var conf={}
    conf.cols=[
        {
            caption:'UID',
            type:'string',
            width:40
        },
        {
            caption:'등급',
            type:'string',
            width:40
        },
        {
            caption:'회원유형',
            type:'string',
            width:50
        },
        {
            caption:'이름',
            type:'string',
            width:30
        },
        {
            caption:'성별',
            type:'string',
            width:30
        },
        {
            caption:'연령',
            type:'string',
            width:30
        },
        {
            caption:'지역',
            type:'string',
            width:30
        },
        {
            caption:'월평균',
            type:'string',
            width:30
        },
        {
            caption:'이메일',
            type:'string',
            width:50
        },
        {
            caption:'전화번호',
            type:'string',
            width:30
        },
        {
            caption:'포인트',
            type:'int',
            width:20
        },
        {
            caption:'참여설문',
            type:'int',
            width:20
        }
    ];



    muser.getMemberListDown(searchName, function(err, rows) {

        var data = rows;

        var dataArry = [];
        if(data.length != 0) {
            var arr = [];
            data.forEach(function (v, i) {

                var UID = v.UID;
                var facebook = v.FACEBOOK_ID;
                var membertype = "";
                if(facebook == 0) {
                    membertype = "일반회원";
                } else {
                    membertype = "페이스북";
                }

                var code_grade = v.CODE_NAME;
                var username = v.USERNAME;
                var sex = v.SEX;
                var age = v.AGE;
                var area = v.AREA_NAME;
                var month_money = v.MONTH_MONEY;
                var useremail = v.USEREMAIL;
                var userphone = v.USERPHONE;
                var userpoint = v.POINT;
                if(userpoint == "") {
                    userpoint = 0;
                }
                var joinsurvey = v.JOIN_TOTAL;
                if(joinsurvey == "") {
                    joinsurvey = 0;
                }

                requestDownload=[UID,membertype,code_grade,username,sex,age,area,month_money,useremail,userphone,String(userpoint),String(joinsurvey)];
                console.log(requestDownload);
                arr.push(requestDownload);
            });

            console.log(arr);

            conf.rows = arr;

            var result = nodeExcel.execute(conf);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition","attachment;filename=MEMBERDATA.xlsx");
            res.end(result, 'binary');
        } else {
            res.send("데이터가 존재하지 않습니다.");
        }
    });
});


router.get("/dellist", function(req, res, next) {
    var page = req.query.page;
    if(page == undefined) {
        page = 1;
    }

    var searchName = req.query.searchName;
    if(searchName == undefined) {
        searchName = "";
    }

    var total = 0;
    var start = 0;
    var viewCnt = 10;


    muser.getDropMemberCount(searchName, function(err, count_rows) {
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
                    html += '<li><a href="./?page=' + result.previous + '&searchName='+searchName+'">' + this.options.translator('PREVIOUS') + '</a></li>';
                }
                if(result.range.length) {
                    for( i = 0, len = result.range.length; i < len; i++) {
                        if(result.range[i] === result.current) {
                            html += '<li class="active"><a href="?page=' + result.range[i] + '&searchName='+searchName+'">' + result.range[i] + '</a></li>';
                        } else {
                            html += '<li><a href="?page=' + result.range[i] + '&searchName='+searchName+'">' + result.range[i] + '</a></li>';
                        }
                    }
                }
                if(result.next) {
                    html += '<li><a href="?page=' + result.next + '&searchName='+searchName+'" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
                }
                html += '</ul></div>';
                return html;
            }
        });



        muser.getDropMemberList(start, searchName, function(err, rows) {
            if(err) {
                console.log(err);
            }
            var userData = rows;
            res.render('users/dellist', { moment:moment, pageHtml: boostrapPaginator, userData: userData });
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
            , member_drop : ""
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
            var facebook_id = data[0].FACEBOOK_ID;
            var last_login = data[0].LAST_LOGIN;
            var member_drop = data[0].MEMBER_DROP;

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
                , facebook_id : facebook_id
                , member_drop : member_drop
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
    var member_drop = req.body.member_drop;

    muser.sp_MEMBER_SAVE(uid, code_grade, username, useremail, userphone, userpasswd, sex, birthday, '', function(err, rows) {
        if(err) {
            console.log(err);
        }

        muser.set_MEMBER_DROP(uid, member_drop, function(err, rows2) {
            if(err) {
                console.log(err);
            }


            var objToJson = rows[0];
            var dataJson = JSON.stringify(objToJson);
            console.log(dataJson);
            res.send(dataJson);
        });


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

    muser.sp_MEMBER_SELECT(uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var userdata = rows[0][0];

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
    var quest_num ='0';
    var err = "";

    muser.sp_MEMBER_POINT_HISTORY_SAVE(uid, point, code_point, point_msg, "",quest_num, function(err, rows) {
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
        startDay = "";
    }

    if(endDay == undefined) {
        endDay = "";
    }


    muser.sp_MEMBER_POINT_STATIC(function(err,rows) {
        var point_static = rows[0][0];
        muser.sp_MEMBER_POINT_REQUEST(startDay,endDay,function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            var request = rows[0];



            res.render("users/pointRequest", {point_static : point_static, request : request,moment : moment , commaNumber: commaNumber});

        });

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

router.get('/panel', function(req, res, next) {
    var page = req.query.page;
    if(page == undefined) {
        page = 1;
    }

    var total = 0;
    var start = 0;
    var viewCnt = 10;
    muser.getPanelCount(function(err, count_rows) {
        total = count_rows[0].TOTAL;
        start = viewCnt * (page - 1);


        var boostrapPaginator = new pagination.TemplatePaginator({
            prelink:'/users/panel', current: page, rowsPerPage: 10,
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



        muser.getPanelList(start, function(err, rows) {
            if(err) {
                console.log(err);
            }
            var userData = rows;
            res.render('users/panel', { moment:moment, pageHtml: boostrapPaginator, userData: userData });
        });
    });
});

router.post("/levelUpdate", function(req, res) {
    var uid = req.body.uid;
    var grade = req.body.grade;

    muser.setGradeUpdate(uid, grade, function(err, row) {
        var json = {
            "ERR_CODE" : "000"
            ,"ERR_MSG" : "OK"
        }
        res.send(json);
    });

});

router.post("/panelSuccessUpdate", function(req, res) {
    var uid = req.body.uid;
    muser.setPanelState(uid, "Y", function(err, rows) {
        var json = {
            "ERR_CODE" : "000"
            ,"ERR_MSG" : "OK"
        }
        res.send(json);
    });
});

router.post("/panelDelete", function(req, res) {
    var uid = req.body.uid;

    muser.sp_PANEL_DELETE(uid, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var json = {
            "ERR_CODE" : "000"
            ,"ERR_MSG" : "OK"
        }
        res.send(json);
    })
});

router.post("/adminPwdUpdate", function(req, res) {
    var now_passwd = req.body.now_passwd;
    var reset_passwd = req.body.reset_passwd;

    muser.sp_ADMIN_PWD_CHANGE(now_passwd, reset_passwd, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var data = rows[0][0];

        res.send(data);
    })
});

router.post("/blackProcess", function(req, res) {
    var uid = req.body.uid;
    var black_code = req.body.black_code;
    var black_etc = req.body.black_etc;
    var campaign_code = req.body.campaign_code;
    var quest_num = req.body.quest_num;
    console.log("test");

    muser.sp_MEMBER_BLACK_SAVE(uid,black_code,black_etc,campaign_code,quest_num, function(err,row) {
        if(err) {
            console.log(err);
            throw err;
        }
        var data = row[0][0];
        var json = {
            "ERR_CODE" : "000"
            ,"ERR_MSG" : "OK"
            ,"DB_TYPE" : data.DB_TYPE
        }
        res.send(json);

    })




});

module.exports = router;
