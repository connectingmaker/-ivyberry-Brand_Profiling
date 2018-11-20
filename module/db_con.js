/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql = require('mysql');
var config = require('../config/db_config').local;


module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database,
                multipleStatements: true
            })
        },
        test_open: function (con) {
            con.connect(function (err) {
                if (err) {
                    console.error('mysql connection error :' + err);
                } else {
                    console.info('mysql is connected successfully.');
                }
            })
        }
        ,enckey: function() {
            return "brandEncKey";
        }
    }
};

//module.exports = sqlConnection;