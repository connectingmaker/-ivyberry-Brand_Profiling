/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();

var mapi = {
    getFacebookCheck: function(facebook_id, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM MEMBER WHERE FACEBOOK_ID = ? ";
        var params = [];
        params.push(facebook_id);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,userCheck: function(email, userpw, callback) {
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
    ,bankList: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CODE_BANK ORDER BY BANK_CODE ASC ";
        var params = [];

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
    ,sp_API_CAMPAIGN_LIST_20181029: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_CAMPAIGN_LIST_20181029(?) ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;

    }
    ,sp_API_CAMPAIGN_LIST_ENCN_20181029: function(uid, area_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_CAMPAIGN_LIST_ENCN_20181029(?, ?) ";
        var params = [];
        params.push(uid);
        params.push(area_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,mycampaignList: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_MY_CAMPAIGN_LIST(?) ";
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
    ,sp_API_POINT_BANK: function(point, bank_code, bankaccount, uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_POINT_BANK(?, ?, ?, ?) ";
        var params = [];
        params.push(point);
        params.push(bank_code);
        params.push(bankaccount);
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,sp_API_POINT_BANK_V1_01: function(point, bank_code, bankaccount, uid, jumin, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_POINT_BANK_V1_01(?, ?, ?, ?, ?) ";
        var params = [];
        params.push(point);
        params.push(bank_code);
        params.push(bankaccount);
        params.push(uid);
        params.push(jumin);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_API_USER_EMAIL_SEARCH: function(phone, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_USER_EMAIL_SEARCH(?) ";
        var params = [];
        params.push(phone);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_API_USER_IDPHONE_SEARCH: function(email, phone, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_USER_IDPHONE_SEARCH(?, ?) ";
        var params = [];
        params.push(email);
        params.push(phone);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_API_USER_PWD_UPDATE: function(email, phone, pwd, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_USER_PWD_UPDATE(?, ?, ?) ";
        var params = [];
        params.push(email);
        params.push(phone);
        params.push(pwd);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,get_pushSelect: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM MEMBER_PUSH_YN WHERE UID = ? ";
        var params = [];
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_API_NOTICE: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_NOTICE() ";
        var params = [];

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_API_NOTICE_BP3: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_API_NOTICE_BP3() ";
        var params = [];

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,sp_CONTENTS: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CONTENTS() ";
        var params = [];

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_CONTENTS_SUB: function(seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CONTENTS_SUB(?) ";
        var params = [];
        params.push(seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
}
module.exports = mapi;