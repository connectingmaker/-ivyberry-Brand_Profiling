/**
 * Created by jccho on 2018. 7. 31..
 */

var mysql_dbc = require('../module/db_con')();

var mcontent = {
    sp_CONTENT_SAVE: function(seq, subject, subject_en,subject_cn,fileimg,contents,contents_en,contents_cn, use_yn, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CONTENT_SAVE(?, ?,?, ?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(seq);
        params.push(subject);
        params.push(subject_en);
        params.push(subject_cn);
        params.push(fileimg);
        params.push(contents);
        params.push(contents_en);
        params.push(contents_cn);
        params.push(use_yn);

        console.log(params);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_content_list: function(page,callback) {
        var connection = mysql_dbc.init();

        var query = " SELECT SEQ,SUBJECT,CONTENTS,USE_YN,INSERT_DATETIME,CASE USE_YN WHEN 'N' THEN '미노출' WHEN 'Y' THEN '노출' END USE_YN_TEXT FROM CONTENT ORDER BY INSERT_DATETIME DESC LIMIT "+page+", 10";
        var params = [];
        params.push();

        var data = connection.query(query, params, callback);
        connection.end();
        return data;

    }
    ,delcontent: function(seq, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM CONTENT WHERE seq = ? ";

        var params = [];
        params.push(seq);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_content_select: function(seq, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT SEQ,SUBJECT,SUBJECT_EN,SUBJECT_CN,CONTENTS,CONTENTS_EN,CONTENTS_CN,USE_YN,FILEIMG,INSERT_DATETIME,CASE USE_YN WHEN 'N' THEN '미노출' WHEN 'Y' THEN '노출' END USE_YN_TEXT FROM CONTENT WHERE seq = ? ";
        var params = [];
        params.push(seq);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,getContentCount: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) AS TOTAL FROM CONTENT ";
        var data = connection.query(query,[],callback);
        connection.end();
        return data;
    }


}

module.exports = mcontent;
