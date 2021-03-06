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
    ,getMemberList: function(page, searchName, sorting, sortingtype,membertype,grade, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " M.UID ";
        query += " , M.MEMBER_DROP ";
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
        query += " , (SELECT COUNT(*) FROM bp3.BP3_SURVEY_DATA WHERE UID = M.UID AND ENDTYPE='E') BP3_JOIN_TOTAL "
        query += " FROM MEMBER M INNER JOIN CODE_GRADE CG ON(M.CODE_GRADE = CG.CODE_GRADE) ";
        if(searchName != "") {
            query += " WHERE (M.USERNAME LIKE '"+searchName+"%' OR M.USEREMAIL LIKE '%"+searchName+"%')";

        }
        if(membertype != "") {
            if(membertype == "face"){
                query += "AND M.FACEBOOK_ID <> 0";
            }else{
                query += "AND M.FACEBOOK_ID ='"+membertype+"'";
            }

        }
        if(grade !=""){
            query += "AND M.CODE_GRADE = '"+grade+"'"
        }

        if(sorting == "") {
            query += " ORDER BY M.INSERT_DATETIME DESC ";
        } else {
            if(sorting == "uid") {
                query += " ORDER BY M.UID " + sortingtype;
            } else if(sorting == "grade") {
                query += " ORDER BY M.CODE_GRADE " + sortingtype;
            } else if(sorting == "point") {
                query += " ORDER BY M.POINT " + sortingtype;
            } else if(sorting == "username") {
                query += " ORDER BY M.USERNAME " + sortingtype;
            } else if(sorting == "email") {
                query += " ORDER BY M.USEREMAIL " + sortingtype;
            } else if(sorting == "membertype") {
                query += " ORDER BY M.FACEBOOK_ID " + sortingtype;
            }

        }

        query += " LIMIT "+page+", 30";


        console.log(query);


        var params = [];

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,getMemberListDown: function(searchName, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " M.UID ";
        query += " , M.USERNAME ";
        query += " , M.USEREMAIL ";
        query += " , M.SEX ";
        query += " , IFNULL(fn_AGE(IFNULL(MD.BRITHDAY,0)),'') AGE ";
        query += " , M.POINT ";
        query += " , M.JOIN_SURVEY_CNT ";
        query += " , fn_DECKEY(M.USERPHONE) USERPHONE "
        query += " , FACEBOOK_ID "
        query += " , FROM_UNIXTIME(M.LAST_LOGIN) AS LAST_LOGIN ";
        query += " , FROM_UNIXTIME(M.INSERT_DATETIME) AS INSERT_DATETIME ";
        query += " , CG.CODE_GRADE ";
        query += " , CG.CODE_NAME ";
        query += " , CG.CODE_DESC ";
        query += " , CA.AREA_NAME AREA_NAME ";
        query += " , CMM.CODE_NAME MONTH_MONEY ";
        query += " , (SELECT COUNT(*) FROM DATA_JOIN WHERE UID = M.UID AND ENDTYPE='E') JOIN_TOTAL"
        query += " FROM MEMBER M INNER JOIN CODE_GRADE CG ON(M.CODE_GRADE = CG.CODE_GRADE) ";
        query += " LEFT JOIN MEMBER_DETAIL MD ON(M.UID = MD.UID) ";
        query += " LEFT JOIN CODE_AREA CA ON(MD.SIDO = CA.CODE_AREA) ";
        query += " LEFT JOIN CODE_MONTH_MONEY CMM ON(MD.MONTH_MONEY = CMM.CODE) ";
        if(searchName != "") {
            query += " WHERE (M.USERNAME LIKE '"+searchName+"%' OR M.USEREMAIL LIKE '%"+searchName+"%')";
            query += " AND M.MEMBER_DROP = 'N' ";
            //query += " AND M.CODE_GRADE > 0";
        } else {
            query += " WHERE M.MEMBER_DROP = 'N' ";
            //query += " WHERE M.CODE_GRADE > 0 ";
        }

        query += " ORDER BY M.INSERT_DATETIME DESC ";

        console.log(query);


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
    ,sp_ADMIN_PWD_CHANGE:function(now_passwd, reset_passwd, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_ADMIN_PWD_CHANGE(?, ?) ";
        var params = [];
        params.push(now_passwd);
        params.push(reset_passwd);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_USERS_STATIC:function(startdate, enddate, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_USERS_STATIC(?, ?) ";
        var params = [];
        params.push(startdate);
        params.push(enddate);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_BLACK_SAVE:function(uid, black_code, black_msg, campaign_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_BLACK_SAVE(?, ?, ?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(black_code);
        params.push(black_msg);
        params.push(campaign_code);
        params.push(quest_num);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_BLACKLIST:function(callback){
        var connection = mysql_dbc.init();
        var query = "call sp_MEMBER_BLACKLIST()";
        var params = [];
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_MEMBER_BLACK_DELETE:function(uid,campaign_code,quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_BLACK_DELETE(?,?,?) ";
        var params = [];
        console.log(params);
        params.push(uid);
        params.push(campaign_code);
        params.push(quest_num);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_MEMBER_POINT_STATIC:function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_POINT_STATIC() ";
        var params = [];
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_MEMBER_BLACKLIST_STATIC_YN: function(uid, campaign_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_MEMBER_BLACKLIST_STATIC_YN(?,?,?) ";
        var params = [];
        params.push(uid);
        params.push(campaign_code);
        params.push(quest_num);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }


}

module.exports = muser;