/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();

var mquestion = {
    sp_QUESTION_GROUP_SAVE: function(group_code, group_name_ko, group_name_en, group_name_cn, memo, etc, question_type, callback)
    {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_GROUP_SAVE(?, ?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(group_code);
        params.push(group_name_ko);
        params.push(group_name_en);
        params.push(group_name_cn);
        params.push(memo);
        params.push(etc);
        params.push(question_type);


        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_QUESTION_GROUP_DELETE: function(group_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_GROUP_DELETE(?) ";

        var params = [];

        params.push(group_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
/*
    ,get_gruopCategorySelect: function(group_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " * ";
        query += " ,0 AS CNT ";
        query += " FROM QUESTION_GROUP WHERE GROUP_CODE = ? ";
        var params = [];
        params.push(group_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    */
    ,getCodeQuestionTypeList: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CODE_QUESTION_TYPE ORDER BY QUESTION_TYPE ASC ";
        var params = [];

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
    ,getQuestionGroupList: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT QG.*, CQT.QUESTION_TYPE_NAME,(SELECT COUNT(*) FROM QUESTION_Q QQ WHERE QG.GROUP_CODE =QQ.GROUP_CODE) Q_CNT FROM ";
        query += " QUESTION_GROUP QG INNER JOIN CODE_QUESTION_TYPE CQT ON(QG.QUESTION_TYPE = CQT.QUESTION_TYPE) ";
        query += " ORDER BY QG.GROUP_CODE ASC ";
        var params = [];

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
    ,getQuestionGroupSelect: function(group_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT QG.*, CQT.QUESTION_TYPE_NAME FROM ";
        query += " QUESTION_GROUP QG INNER JOIN CODE_QUESTION_TYPE CQT ON(QG.QUESTION_TYPE = CQT.QUESTION_TYPE) ";
        query += " WHERE QG.GROUP_CODE = ? ";
        var params = [];
        
        params.push(group_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }

    ,getQuestionList:function(group_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM QUESTION_Q WHERE GROUP_CODE = ? ";

        var params = [];

        params.push(group_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }




    ,sp_QUESTION_Q_DELETE: function(q_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_Q_DELETE(?) ";

        var params = [];

        params.push(q_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
    ,sp_QUESTION_Q_SAVE: function(q_code, group_code, q_name, q_title_ko, q_title_en, q_title_cn, etc, memo, q_img_min, q_img_max, q_text_min, q_text_max, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_Q_SAVE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";

        var params = [];

        params.push(q_code);
        params.push(group_code);
        params.push(q_name);
        params.push(q_title_ko);
        params.push(q_title_en);
        params.push(q_title_cn);
        params.push(etc);
        params.push(memo);
        params.push(q_img_min);
        params.push(q_img_max);
        params.push(q_text_min);
        params.push(q_text_max);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
    ,sp_QUESTION_QA_SAVE: function(q_code, qaData, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_QA_SAVE(?, ?, ?, ?, ?, ?) ";

        var params = [];
        for(var i = 0; i<qaData.length; i++) {
            params = [];
            params.push(q_code);
            params.push(qaData[i].qa_code);
            params.push(qaData[i].qa_title_ko);
            params.push(qaData[i].qa_title_en);
            params.push(qaData[i].qa_title_cn);
            params.push(qaData[i].img);
            if(i == qaData.length - 1) {
                var data = connection.query(query, params, callback);
                connection.end();
                return data;
            } else {
                var data = connection.query(query, params);
            }

        }

    }
    ,sp_QUESTION_QA_DELETE: function(q_code, qa_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_QA_DELETE(?, ?) ";

        var params = [];

        params.push(q_code);
        params.push(qa_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
    ,setQuestionQUse: function(q_code, use_yn, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE QUESTION_Q SET USE_YN = ? WHERE Q_CODE = ? ";

        var params = [];

        params.push(use_yn);
        params.push(q_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
    ,sp_QUESTION_Q: function(q_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_Q_SELECT(?) ";

        var params = [];

        params.push(q_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }

    ,sp_QUESTION_QA: function(q_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_QA_SELECT(?) ";

        var params = [];

        params.push(q_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
    ,set_groupUseYNUpdate: function(group_code, use_yn, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE QUESTION_GROUP SET USE_YN = ? WHERE GROUP_CODE = ? ";

        var params = [];

        params.push(use_yn);
        params.push(group_code);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }
};

module.exports = mquestion;