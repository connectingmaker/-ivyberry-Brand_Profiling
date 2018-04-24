/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql_dbc = require('../module/db_con')();
var dataArray = [];



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
    ,sp_STATISTICS_QUESTION_GROUP_DATA_20180411: function(campaign_code, group_code, q_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_QUESTION_GROUP_DATA_20180411(?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(group_code);
        params.push(q_code);
        params.push(quest_num);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_STATISTICS_QUESTION_GROUP_DATA_KEYWORD: function(campaign_code, quest_num, group_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_QUESTION_GROUP_DATA_KEYWORD(?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(quest_num);
        params.push(group_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,getBrandList: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT CBP.DETAIL_BRAND_CODE, BCS.BRAND_NAME_KO FROM CAMPAIGN_BRAND_POOL CBP ";
        query += " INNER JOIN BRAND_CATEGORY_SUB BCS ON(CBP.DETAIL_BRAND_CODE = BCS.DETAIL_CATEGORY_CODE) ";
        query += " WHERE CBP.CAMPAIGN_CODE = ? ";

        var params = [];
        params.push(campaign_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,getQuestionList: function(group_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT Q_CODE, Q_NAME FROM ";
        query += " QUESTION_Q ";
        query += " WHERE GROUP_CODE = ? ";



        var params = [];
        params.push(group_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_RAWDATA_GROUP: function(campaign_code, quest_num, group_code, brand_code, endtype, callback) {

        var connection = mysql_dbc.init();


        var query = " call sp_CAMPAIGN_RAWDATA_GROUP(?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(quest_num);
        params.push(group_code);
        params.push(brand_code);


        connection.query(query,params,function(err, results){
            dataArray.push(results[0]);
            if(endtype == 'E') {
                console.log(dataArray.length);
                callback(err, dataArray);
            }
        });

        connection.end();
    }
    ,sp_STATISTICS_TEXTCLODE: function(campaign_code, quest_num, brand_code, q_code, qa_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_STATISTICS_TEXTCLODE(?, ?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(quest_num);
        params.push(brand_code);
        params.push(q_code);
        params.push(qa_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
}

module.exports = mstatistics;