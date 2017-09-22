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


}

module.exports = muser;