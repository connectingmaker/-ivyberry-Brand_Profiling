/**
 * Created by kwangheejung on 2017. 9. 18..
 */

var mysql_dbc = require('../module/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);



var muser = {
    /**** 관리자 로그인 조회 ********/
    getAdminMemberSelect: function(adminid, adminpw, callback) {
        var query = " SELECT * FROM ADMIN_MEMBER WHERE ADMIN_ID = ? AND ADMIN_PW = ?";
        var params = [];
        params.push(adminid);
        params.push(adminpw);

        return connection.query(query,params,callback);
    }


}

module.exports = muser;