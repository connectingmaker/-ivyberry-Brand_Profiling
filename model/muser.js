/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql_dbc = require('../module/db_con')();




var muser = {
    /**** 관리자 로그인 조회 ********/
    getAdminMemberSelect: function(adminid, adminpw, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM ADMIN_MEMBER WHERE ADMIN_ID = ? AND ADMIN_PW = ?";
        var params = [];
        params.push(adminid);
        params.push(adminpw);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,getMemberSelect: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM MEMBER WHERE UID = ?";
        var params = [];
        params.push(uid);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,getEmailCount: function(useremail, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) AS TOTAL FROM MEMBER WHERE USEREMAIL = ? ";
        var params = [];
        params.push(useremail);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,getMemberCount: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) AS TOTAL FROM MEMBER ";
        var data = connection.query(query,[],callback);
        connection.end();
        return data;
    }
    ,getMemberList: function(page, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " M.UID ";
        query += " , M.USERNAME ";
        query += " , M.USEREMAIL ";
        query += " , M.SEX ";
        query += " , M.BIRTHDAY ";
        query += " , M.POINT ";
        query += " , M.JOIN_SURVEY_CNT ";
        query += " , AES_DECRYPT(UNHEX(M.USERPHONE), '"+mysql_dbc.enckey()+"') AS USERPHONE "
        query += " , FROM_UNIXTIME(M.LAST_LOGIN) AS LAST_LOGIN ";
        query += " , FROM_UNIXTIME(M.INSERT_DATETIME) AS INSERT_DATETIME ";
        query += " , CG.CODE_GRADE ";
        query += " , CG.CODE_NAME ";
        query += " , CG.CODE_DESC ";
        query += " FROM MEMBER M INNER JOIN CODE_GRADE CG ON(M.CODE_GRADE = CG.CODE_GRADE) ";
        query += " ORDER BY M.INSERT_DATETIME DESC ";
        query += " LIMIT "+page+", 10";



        var params = [];

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_SAVE: function(uid, code_grade, username, useremail, userphone, userpasswd, sex, birthday, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_SAVE(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(uid);
        params.push(code_grade);
        params.push(username);
        params.push(useremail);
        params.push(userphone);
        params.push(userpasswd);
        params.push(sex);
        params.push(birthday);
        params.push(mysql_dbc.enckey());

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }


}

module.exports = muser;