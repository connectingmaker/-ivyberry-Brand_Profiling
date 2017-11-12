/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql_dbc = require('../module/db_con')();




var mstatistics = {
    /************ 질문그룹별 통계 ***********/
    sp_STATISTICS_QUESTION: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_QUESTION()";
        var params = [];
        var data = connection.query(query,callback);
        connection.end();
        return data;
    }


}

module.exports = mstatistics;