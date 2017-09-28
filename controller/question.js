var express = require('express');
var router = express.Router();

var mquestion = require("../model/mquestion");

var moment = require('moment');

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
        console.log(dataJson);
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
    })


});


module.exports = router;
