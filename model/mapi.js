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
}
module.exports = mapi;