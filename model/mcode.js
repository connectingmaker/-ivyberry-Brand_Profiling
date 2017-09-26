/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql_dbc = require('../module/db_con')();




var mcode = {
    /**** 코드 리스트 ********/
    getCodeGradeList: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CODE_GRADE ORDER BY CODE_GRADE ASC";
        var params = [];
        var data = connection.query(query,callback);
        connection.end();
        return data;
    }


}

module.exports = mcode;