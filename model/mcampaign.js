/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql_dbc = require('../module/db_con')();




var mcampaign = {
    /**** 관리자 로그인 조회 ********/
    sp_CAMPAIGN_SAVE: function(campaign_code, campaign_title, campaign_desc, campaign_startdate, campaign_enddate, category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_SAVE(?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(campaign_title);
        params.push(campaign_desc);
        params.push(campaign_startdate);
        params.push(campaign_enddate);
        params.push(category_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_campaign_list: function(campaign_ing, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT CAMPAIGN_CODE, CAMPAIGN_TITLE, CAMPAIGN_DESC, CATEGORY_CODE, FROM_UNIXTIME(CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, CAMPAIGN_ING, VIRTUAL_YN, JOIN_CNT, INSERT_DATETIME, MODIFY_DATETIME FROM CAMPAIGN WHERE CAMPAIGN_ING IN(?) ORDER BY INSERT_DATETIME DESC ";

        var params = [];
        params.push(campaign_ing);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_campaign_select: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT CAMPAIGN_CODE, CAMPAIGN_TITLE, CAMPAIGN_DESC, CATEGORY_CODE, FROM_UNIXTIME(CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, CAMPAIGN_ING, VIRTUAL_YN, JOIN_CNT, INSERT_DATETIME, MODIFY_DATETIME FROM CAMPAIGN WHERE CAMPAIGN_CODE = ? ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,set_campaign_virtual: function(campaign_code, virtual_yn, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE CAMPAIGN SET VIRTUAL_YN = ? WHERE CAMPAIGN_CODE = ? ";
        var params = [];
        params.push(virtual_yn);
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_BRAND_SUB_SAVE: function(campaign_code, detail_category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_BRAND_SUB_SAVE(?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(detail_category_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_BRAND_POOL_LIST: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_BRAND_POOL_LIST(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_BRAND_POOL_SAVE: function(campaign_code, detail_brand_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_BRAND_POOL_SAVE(?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(detail_brand_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,delCampaign: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM CAMPAIGN WHERE CAMPAIGN_CODE = ? ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_QUESTION_GROUP:function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUESTION_GROUP(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_QUESTION_GROUP_SAVE: function(data, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUESTION_GROUP_SAVE(?, ?, ?) ";

        var params = [];
        for(var i = 0; i<data.length; i++) {
            params = [];
            params.push(data[i].campaign_code);
            params.push(data[i].group_code);
            params.push(data[i].quest_num);

            if(i == data.length - 1) {
                var data = connection.query(query, params, callback);
                connection.end();
                return true;
            } else {
                connection.query(query, params);
                //var data = connection.query(query, params);
            }


        }
    }
    ,sp_CAMPAIGN_GRADE_COUNT: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_GRADE_COUNT(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_QUEST_SETTING_LIST: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUEST_SETTING_LIST(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_GRADE_IN_JOIN_CNT_UPDATE: function(campaign_code, join_cnt, grade_text, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_GRADE_IN_JOIN_CNT_UPDATE(?, ?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(join_cnt);
        params.push(grade_text);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_QUESTION_GROUP_UPDATE: function(campaign_code, jsonData, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUESTION_GROUP_UPDATE(?, ?, ?, ?, ?) ";

        var params = [];
        for(var i = 0; i<jsonData.length; i++) {
            params = [];
            params.push(campaign_code);
            params.push(jsonData[i].group_code);
            params.push(jsonData[i].quest);
            params.push(jsonData[i].point);
            params.push(jsonData[i].survey_time);
            console.log(params);

            if(i == jsonData.length - 1) {
                var data = connection.query(query, params, callback);
                connection.end();
                return true;
            } else {
                connection.query(query, params);
                //var data = connection.query(query, params);
            }


        }
    }
}

module.exports = mcampaign;