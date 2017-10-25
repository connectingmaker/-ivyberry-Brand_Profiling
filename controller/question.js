var express = require('express');
var router = express.Router();
var path = require('path');
var mquestion = require("../model/mquestion");
var moment = require('moment');

var multer = require('multer');//업로드를 위한 multer를 가져옴
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
    }
});

var upload = multer({storage:storage});//uploads라는 폴더가 업로드 폴더임
var fs = require('fs');

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

router.post("/qaDelete", function(req, res) {
    var q_code = req.body.q_code;
    var qa_code = req.body.qa_code;

    mquestion.sp_QUESTION_QA_DELETE(q_code, qa_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var jsonData = {
            q_code : q_code
            ,qa_code : qa_code
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



router.post("/qSelectMulti", function(req, res) {
    var q_code = req.body.q_code;
    var question_type = req.body.question_type;

    mquestion.sp_QUESTION_Q(q_code, function(err, rows) {
        if(err) {
            console.log(err);
            throw err;
        }
        var qData = rows[0];
        mquestion.sp_QUESTION_QA(q_code, function(err, rows) {
            var qaData = rows[0];

            var jsonData = {
                q: qData
                ,qa: qaData
            };

            var dataJson = JSON.stringify(jsonData);

            console.log(dataJson);

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
    var q_img_min = "";
    var q_img_max = "";
    var q_text_min = "";
    var q_text_max = "";

    if(req.body.q_img_min == undefined) {
        q_img_min = "";
    } else {
        q_img_min = req.body.q_img_min;
    }

    if(req.body.q_img_max == undefined) {
        q_img_max = "";
    } else {
        q_img_max = req.body.q_img_max;
    }

    if(req.body.q_text_min == undefined) {
        q_text_min = "";
    } else {
        q_text_min = req.body.q_text_min;
    }


    if(req.body.q_text_max == undefined) {
        q_text_max = "";
    } else {
        q_text_max = req.body.q_text_max;
    }

    var etc = req.body.etc;
    var memo = req.body.memo;
    var qaData = eval("("+req.body.qaJson+")");

    mquestion.sp_QUESTION_Q_SAVE(q_code, group_code, q_name, q_title_ko, q_title_en, q_title_cn, etc, memo, q_img_min, q_img_max, q_text_min, q_text_min, function(err, rows) {
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


router.post("/imageUpdate", upload.single('qa_title_img'), function(req, res){
    var json = {
        img : req.file.filename
    };

    res.send(json);
});



module.exports = router;
