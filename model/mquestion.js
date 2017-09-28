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
        var query = " SELECT QG.*, CQT.QUESTION_TYPE_NAME FROM ";
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
};

module.exports = mquestion;