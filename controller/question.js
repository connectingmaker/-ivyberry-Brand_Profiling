var express = require('express');
var router = express.Router();
var mquestion = require("../model/mquestion");
var moment = require('moment');

var multer = require("multer");
var upload = multer({ dest: 'uploads/' });

/* GET users listing. */
router.get('/group', function(req, res, next) {
    mquestion.getCodeQuestionTypeList(function(err, rows) {
        if(err) {
            console.log(err);
        }
        var question_type_list = rows;
        mquestion.getQuestionGroupList(function(err, rows) {
            if(err) {
                console.log(err);
            }
            var grouplist = rows;
            res.render('question/group', { question_type_list : question_type_list, grouplist : grouplist, moment: moment });
        });

    });

});

router.post('/group', function(req, res) {
    var group_code = req.body.group_code;
    var group_name_ko = req.body.group_name_ko;
    var group_name_en = req.body.group_name_en;
    var group_name_cn = req.body.group_name_cn;
    var memo = req.body.memo;
    var etc = req.body.etc;
    var question_type = req.body.question_type;

    mquestion.sp_QUESTION_GROUP_SAVE(group_code, group_name_ko, group_name_en, group_name_cn, memo, etc, question_type, function(err, rows) {
        if(err) {
            console.log(err);
        }


        var objToJson = rows[0];
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);
    });


});

router.get('/group/detail/:code', function(req, res) {
    var group_code = req.params.code;

    mquestion.getCodeQuestionTypeList(function(err, rows) {
        if(err) {
            console.log(err);
        }

        var question_type_list = rows;

        mquestion.getQuestionGroupSelect(group_code, function(err, rows) {
            if(err) {
                console.log(err);
            }

            var grouplist = rows[0];

            res.render('question/group/detail', { group_code : group_code, question_type_list : question_type_list, grouplist: grouplist, moment: moment  });
        });
    });
});

router.post("/qlist", function(req, res) {
    var group_code = req.body.group_code;

    mquestion.getQuestionList(group_code, function(err, rows) {
       if(err) {
           console.log(err);
           throw err;
       }

        var objToJson = rows;
        var dataJson = JSON.stringify(objToJson);
        res.send(dataJson);
    });
});

router.post("/qDelete", function(req, res) {
    var q_code = req.body.q_code;

    mquestion.sp_QUESTION_Q_DELETE(q_code, function(err, rows) {
        if(err)
        {
            console.log(err);
            throw err;
        }

        var jsonData = {
            q_code : q_code
        }

        res.send(jsonData);
    });
});

router.post("/qUseUpdate", function(req, res) {
    var q_code = req.body.q_code;
    var use_yn = req.body.use_yn;

    if(use_yn == "N") {
        use_yn = "Y";
    } else {
        use_yn = "N";
    }

    mquestion.setQuestionQUse(q_code, use_yn, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }

        var json = {
            q_code : q_code
            ,use_yn : use_yn
        };

        res.send(json);
    });
});

router.post("/singleProcess", function(req, res) {
    var q_code = req.body.q_code;
    var group_code = req.body.group_code;

    var q_name = req.body.q_name;
    var q_title_ko = req.body.q_title_ko;
    var q_title_en = req.body.q_title_en;
    var q_title_cn = req.body.q_title_cn;
    var etc = req.body.etc;
    var memo = req.body.memo;
    var qaData = eval("("+req.body.qaJson+")");

    mquestion.sp_QUESTION_Q_SAVE(q_code, group_code, q_name, q_title_ko, q_title_en, q_title_cn, etc, memo, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var qData = rows[0];
        q_code = qData[0].Q_CODE;

        var objToJson = qData;
        var dataJson = JSON.stringify(objToJson);

        mquestion.sp_QUESTION_QA_SAVE(q_code, qaData, function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            res.send(dataJson);
        });
    });
});

router.post("/multiProcess", function(req, res) {
    var q_code = req.body.q_code;
    var group_code = req.body.group_code;

    var q_name = req.body.q_name;
    var q_title_ko = req.body.q_title_ko;
    var q_title_en = req.body.q_title_en;
    var q_title_cn = req.body.q_title_cn;
    var etc = req.body.etc;
    var memo = req.body.memo;
    var qaData = eval("("+req.body.qaJson+")");

    mquestion.sp_QUESTION_Q_SAVE(q_code, group_code, q_name, q_title_ko, q_title_en, q_title_cn, etc, memo, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var qData = rows[0];
        q_code = qData[0].Q_CODE;

        var objToJson = qData;
        var dataJson = JSON.stringify(objToJson);

        mquestion.sp_QUESTION_QA_SAVE(q_code, qaData, function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            res.send(dataJson);
        });
    });
});

router.post("/scaleProcess", function(req, res) {
    var q_code = req.body.q_code;
    var group_code = req.body.group_code;

    var q_name = req.body.q_name;
    var q_title_ko = req.body.q_title_ko;
    var q_title_en = req.body.q_title_en;
    var q_title_cn = req.body.q_title_cn;
    var etc = req.body.etc;
    var memo = req.body.memo;
    var qaData = eval("("+req.body.qaJson+")");

    mquestion.sp_QUESTION_Q_SAVE(q_code, group_code, q_name, q_title_ko, q_title_en, q_title_cn, etc, memo, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var qData = rows[0];
        q_code = qData[0].Q_CODE;

        var objToJson = qData;
        var dataJson = JSON.stringify(objToJson);

        mquestion.sp_QUESTION_QA_SAVE(q_code, qaData, function(err, rows) {
            if(err) {
                console.log(err);
                throw err;
            }
            res.send(dataJson);
        });
    });
});

router.post("/scaleImgProcess", upload.array('uploadFile'), function(req, res) {
    console.log(req.body);
    res.send("111");
});


module.exports = router;
