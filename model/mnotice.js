/**
 * Created by jccho on 2017. 12. 5..
 */
var mysql_dbc = require('../module/db_con')();




var mnotice = {
    sp_NOTICE_SAVE: function(seq, subject, contents, use_yn, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_NOTICE_SAVE(?, ?, ?, ?)";
        var params = [];
        params.push(seq);
        params.push(subject);
        params.push(contents);
        params.push(use_yn);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_notice_list: function(page,callback) {
    var connection = mysql_dbc.init();

        var query = " SELECT SEQ,SUBJECT,CONTENTS,USE_YN,INSERT_DATETIME,CASE USE_YN WHEN 'N' THEN '미노출' WHEN 'Y' THEN '노출' END USE_YN_TEXT FROM NOTICE ORDER BY INSERT_DATETIME DESC LIMIT "+page+", 10";
        var params = [];
        params.push();

        var data = connection.query(query, params, callback);
        connection.end();
        return data;

    }
    ,delnotice: function(seq, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM NOTICE WHERE seq = ? ";

        var params = [];
        params.push(seq);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_notice_select: function(seq, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT SEQ,SUBJECT,CONTENTS,USE_YN,INSERT_DATETIME,CASE USE_YN WHEN 'N' THEN '미노출' WHEN 'Y' THEN '노출' END USE_YN_TEXT FROM NOTICE WHERE seq = ? ";
        var params = [];
        params.push(seq);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,getNoticeCount: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) AS TOTAL FROM NOTICE ";
        var data = connection.query(query,[],callback);
        connection.end();
        return data;
    }


}

module.exports = mnotice;
