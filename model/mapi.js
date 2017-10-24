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
}
module.exports = mapi;