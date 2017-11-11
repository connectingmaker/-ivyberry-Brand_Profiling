/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();

var mapi = {
    userCheck: function(email, userpw, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_USER_CHECK(?, ?) ";
        var params = [];
        params.push(email);
        params.push(userpw);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,userPhoneAuth: function(phoneNumber, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_USER_PHONE_AUTH(?) ";
        var params = [];
        params.push(phoneNumber);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,userPhoneAuthCheck: function(phoneNumber, authCode, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_USER_PHONE_AUTH_CHECK(?, ?) ";
        var params = [];
        params.push(phoneNumber);
        params.push(authCode);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,userSelect: function(email, passwd, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_USER(?, ?) ";
        var params = [];
        params.push(email);
        params.push(passwd);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,campaignList: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_CAMPAIGN_LIST(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,userPoint:function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_USER_POINT(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,pointHistoryList: function(uid, code_point, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_POINT_HISTORY(?, ?) ";
        var params = [];
        params.push(uid);
        params.push(code_point);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,pointHistoryBank: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_POINT_HISTORY_BANK(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,surveyStart: function(campaign_code, uid, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_SURVEY_START(?, ?, ?) ";
        var params = [];
        params.push(campaign_code, uid, quest_num);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,surveyPage: function(campaign_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_SURVEY_PAGE(?, ?) ";
        var params = [];
        params.push(campaign_code, quest_num);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,brandList: function(campaign_code, seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_SURVEY_BRAND(?, ?) ";
        var params = [];
        params.push(campaign_code, seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,brandSave: function(seq, data, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_QUESTION_QA_SAVE(?, ?, ?, ?, ?, ?) ";

        var params = [];
        for(var i = 0; i<data.length; i++) {
            params = [];
            params.push(q_code);
            params.push(qaData[i].qa_code);
            params.push(qaData[i].qa_title_ko);
            params.push(qaData[i].qa_title_en);
            params.push(qaData[i].qa_title_cn);
            params.push(qaData[i].img);
            if(i == data.length - 1) {
                var data = connection.query(query, params, callback);
                connection.end();
                return data;
            } else {
                var data = connection.query(query, params);
            }

        }
    }
    ,sp_API_MEMBER_SELECT: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_MEMBER_SELECT(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_API_PWD_USER_CHECK: function(uid, email, phone, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_PWD_USER_CHECK(?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(email);
        params.push(phone);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_API_PWD_CHANGE: function(uid, pwd, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_PWD_CHANGE(?, ?) ";
        var params = [];
        params.push(uid);
        params.push(pwd);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
}
module.exports = mapi;