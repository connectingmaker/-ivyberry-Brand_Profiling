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
        var query = " SELECT *, fn_DECKEY(USERPHONE) DECODE_PHONE FROM MEMBER WHERE UID = ?";
        var params = [];
        params.push(uid);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_TOTAL: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_TOTAL()";
        var params = [];

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_SELECT: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_SELECT(?)";
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
    ,getMemberCount: function(searchName, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) AS TOTAL FROM MEMBER ";
        if(searchName != "") {
            query += " WHERE (USERNAME LIKE '"+searchName+"%' OR USEREMAIL LIKE '%"+searchName+"%')";

        }
        var data = connection.query(query,[],callback);
        connection.end();
        return data;
    }
    ,getMemberList: function(page, searchName, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " M.UID ";
        query += " , M.USERNAME ";
        query += " , M.USEREMAIL ";
        query += " , M.SEX ";
        query += " , M.BIRTHDAY ";
        query += " , M.POINT ";
        query += " , M.JOIN_SURVEY_CNT ";
        query += " , fn_DECKEY(M.USERPHONE) USERPHONE "
        query += " , FACEBOOK_ID "
        query += " , FROM_UNIXTIME(M.LAST_LOGIN) AS LAST_LOGIN ";
        query += " , FROM_UNIXTIME(M.INSERT_DATETIME) AS INSERT_DATETIME ";
        query += " , CG.CODE_GRADE ";
        query += " , CG.CODE_NAME ";
        query += " , CG.CODE_DESC ";
        query += " , (SELECT COUNT(*) FROM DATA_JOIN WHERE UID = M.UID AND ENDTYPE='E') JOIN_TOTAL"
        query += " FROM MEMBER M INNER JOIN CODE_GRADE CG ON(M.CODE_GRADE = CG.CODE_GRADE) ";
        if(searchName != "") {
            query += " WHERE (M.USERNAME LIKE '"+searchName+"%' OR M.USEREMAIL LIKE '%"+searchName+"%')";

        }
        query += " ORDER BY M.INSERT_DATETIME DESC ";
        query += " LIMIT "+page+", 10";



        var params = [];

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,getDropMemberCount: function(searchName, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) AS TOTAL FROM MEMBER ";
        query += " WHERE MEMBER_DROP = 'Y' ";
        if(searchName != "") {
            query += " AND (USERNAME LIKE '"+searchName+"%' OR USEREMAIL LIKE '%"+searchName+"%')";

        }
        var data = connection.query(query,[],callback);
        connection.end();
        return data;
    }

    ,getDropMemberList: function(page, searchName, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " M.UID ";
        query += " , M.USERNAME ";
        query += " , M.USEREMAIL ";
        query += " , M.SEX ";
        query += " , M.BIRTHDAY ";
        query += " , M.POINT ";
        query += " , M.JOIN_SURVEY_CNT ";
        query += " , fn_DECKEY(M.USERPHONE) USERPHONE "
        query += " , FROM_UNIXTIME(M.LAST_LOGIN) AS LAST_LOGIN ";
        query += " , FROM_UNIXTIME(M.INSERT_DATETIME) AS INSERT_DATETIME ";
        query += " , CG.CODE_GRADE ";
        query += " , CG.CODE_NAME ";
        query += " , CG.CODE_DESC ";
        query += " , (SELECT COUNT(*) FROM DATA_JOIN WHERE UID = M.UID AND ENDTYPE='E') JOIN_TOTAL"
        query += " FROM MEMBER M INNER JOIN CODE_GRADE CG ON(M.CODE_GRADE = CG.CODE_GRADE) ";
        query += " WHERE M.MEMBER_DROP = 'Y' ";
        if(searchName != "") {
            query += " AND (M.USERNAME LIKE '"+searchName+"%' OR M.USEREMAIL LIKE '%"+searchName+"%')";

        }
        query += " ORDER BY M.INSERT_DATETIME DESC ";
        query += " LIMIT "+page+", 10";



        var params = [];

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_MEMBER_SAVE: function(uid, code_grade, username, useremail, userphone, userpasswd, sex, birthday, facebook_id, callback) {
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
        params.push(facebook_id);
        params.push(mysql_dbc.enckey());

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,set_MEMBER_DROP : function(uid, member_drop, callback) {
        var connection = mysql_dbc.init();
        var query = "";
        var params = [];
        query = " UPDATE MEMBER SET MEMBER_DROP = ? WHERE UID = ? ";
        params.push(member_drop, uid);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_TOKEN: function(uid, token, os, version, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_TOKEN(?, ?, ?, ?)";
        var params = [];
        params.push(uid);
        params.push(token);
        params.push(os);
        params.push(version);
        params.push(mysql_dbc.enckey());

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_DELETE: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_DELETE(?)";
        var params = [];
        params.push(uid);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_pointHistoryCnt: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) TOTAL FROM MEMBER_POINT_HISTORY WHERE UID = ? ";
        var params = [];
        params.push(uid);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_POINT_HISTORY_SAVE: function(uid, point, point_type, point_msg, campaign_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_POINT_HISTORY(?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(uid);
        params.push(point);
        params.push(point_type);
        params.push(point_msg);
        params.push(campaign_code);
        params.push(quest_num);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_POINT_HISTORY_LIST: function(uid, page, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_POINT_HISTORY_LIST(?, ?)";
        var params = [];
        params.push(uid);
        params.push(page);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_codePointList: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CODE_POINT ORDER BY CODE_POINT ASC ";
        var params = [];
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_POINT_REQUEST: function(startDay,endDay,callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_POINT_REQUEST(?,?)";
        var params = [];
        params.push(startDay);
        params.push(endDay);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,set_pointRequestUpdate: function(seq,request, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_POINT_REQUEST_UPDATE(?,?)";

        var params = [];
        params.push(seq);
        params.push(request);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }

    ,set_dropMember: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE MEMBER SET MEMBER_DROP = ? WHERE UID = ?";

        var params = [];
        params.push("Y");
        params.push(uid);

        var data = connection.query(query,params, callback);
        connection.end();
        return data;
    }

    ,getPanelCount: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) AS TOTAL FROM PANEL ";
        var data = connection.query(query,[],callback);
        connection.end();
        return data;
    }
    ,getPanelList: function(page, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " M.UID ";
        query += " , M.USERNAME ";
        query += " , M.USEREMAIL ";
        query += " , M.CODE_GRADE ";
        query += " , fn_DECKEY(M.USERPHONE) USERPHONE "
        query += " , FROM_UNIXTIME(P.INSERT_DATETIME) AS INSERT_DATETIME ";
        query += " , P.Q1";
        query += " , P.Q2";
        query += " , P.Q3";
        query += " , P.Q4";
        query += " , P.STATUS ";
        query += " , (SELECT COUNT(*) FROM PANEL WHERE UID = M.UID) PANEL_TOTAL"
        query += " FROM MEMBER M INNER JOIN PANEL P ON(M.UID = P.UID) ";
        query += " ORDER BY P.INSERT_DATETIME DESC ";
        query += " LIMIT "+page+", 10";



        var params = [];

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_PANEL_DELETE: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM PANEL WHERE UID = ? ";
        var params = [];
        params.push(uid);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_PANEL_SAVE: function(uid, q1,q2,q3,q4,status, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_PANEL_SAVE(?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(uid);
        params.push(q1);
        params.push(q2);
        params.push(q3);
        params.push(q4);
        params.push(status);
        params.push(mysql_dbc.enckey());

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,setGradeUpdate: function(uid, grade, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE MEMBER SET CODE_GRADE = ? WHERE UID = ? ";
        var params = [];
        params.push(grade);
        params.push(uid);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,setPanelState: function(uid, state, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE PANEL SET STATUS = ? WHERE UID = ? ";
        var params = [];
        params.push(state);
        params.push(uid);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

}

module.exports = muser;