/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql_dbc = require('../module/db_con')();




var mstatistics = {
    /************ 질문그룹별 통계 ***********/
    sp_STATISTICS_QUESTION: function(campaign_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_QUESTION(?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(quest_num);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_STATISTICS_QUESTION_GROUP_LIST: function(campaign_code, group_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_QUESTION_GROUP_LIST(?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(group_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_STATISTICS_QUESTION_GROUP_DATA: function(campaign_code, group_code, q_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_QUESTION_GROUP_DATA(?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(group_code);
        params.push(q_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_STATISTICS_QUESTION_GROUP_DATA_20180126: function(campaign_code, group_code, q_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_QUESTION_GROUP_DATA_20180126(?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(group_code);
        params.push(q_code);
        params.push(quest_num);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_STATISTICS_QUESTION_GROUP_DATA_20180315: function(campaign_code, group_code, q_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_QUESTION_GROUP_DATA_20180315(?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(group_code);
        params.push(q_code);
        params.push(quest_num);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
}

module.exports = mstatistics;