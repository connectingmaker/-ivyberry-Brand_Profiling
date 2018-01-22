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
    ,set_campaign_statusUpdate: function(campaign_code, status, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE CAMPAIGN SET CAMPAIGN_ING = ? WHERE CAMPAIGN_CODE = ?";
        var params = [];
        params.push(status);
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_campaign_count: function(campaign_ing, searchName, callback) {
        var connection = mysql_dbc.init();
        if(campaign_ing == "") {
            var query = " SELECT COUNT(*) TOTAL FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) WHERE C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '" + searchName + "%' ";
            }
            query += " ORDER BY C.INSERT_DATETIME DESC ";
            var params = [];
            params.push();

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        } else {
            var query = " SELECT COUNT(*) TOTAL FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) WHERE C.CAMPAIGN_ING = ? AND C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '" + searchName + "%' ";
            }
            query += " ORDER BY C.INSERT_DATETIME DESC ";
            var params = [];
            params.push(campaign_ing);

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        }
    }
    ,get_campaign_list: function(campaign_ing, page, searchName, callback) {
        var connection = mysql_dbc.init();
        if(campaign_ing == "") {
            var query = " SELECT C.CAMPAIGN_CODE, C.CAMPAIGN_TITLE, C.CAMPAIGN_DESC, C.CATEGORY_CODE, FROM_UNIXTIME(C.CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(C.CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, C.CAMPAIGN_ING, CASE C.CAMPAIGN_ING WHEN 'N' THEN '대기' WHEN 'S' THEN '진행중' WHEN 'E' THEN '완료' END CAMPAIGN_ING_TEXT, C.VIRTUAL_YN, C.JOIN_CNT, BC.CATEGORY_NAME_KO, C.INSERT_DATETIME, C.MODIFY_DATETIME, (SELECT COUNT(*) FROM DATA_JOIN WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE='E') JOIN_DATA FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) ";
            query += " WHERE C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '" + searchName + "%' ";
            }
            query += " ORDER BY C.INSERT_DATETIME DESC LIMIT "+page+", 10 ";
            var params = [];
            params.push();

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        } else {
            var query = " SELECT C.CAMPAIGN_CODE, C.CAMPAIGN_TITLE, C.CAMPAIGN_DESC, C.CATEGORY_CODE, FROM_UNIXTIME(C.CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(C.CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, C.CAMPAIGN_ING, CASE C.CAMPAIGN_ING WHEN 'N' THEN '대기' WHEN 'S' THEN '진행중' WHEN 'E' THEN '완료' END CAMPAIGN_ING_TEXT, C.VIRTUAL_YN, C.JOIN_CNT, BC.CATEGORY_NAME_KO, C.INSERT_DATETIME, C.MODIFY_DATETIME , (SELECT COUNT(*) FROM DATA_JOIN WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE='E') JOIN_DATA FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) ";
            query += " WHERE C.CAMPAIGN_ING = ? ";
            query += " AND C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '" + searchName + "%' ";
            }
            query += " ORDER BY C.INSERT_DATETIME DESC LIMIT "+page+", 10 ";
            var params = [];
            params.push(campaign_ing);

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        }
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
        //var query = " DELETE FROM CAMPAIGN WHERE CAMPAIGN_CODE = ? ";
        var query = "call sp_CAMPAIGN_DELETE(?)";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,hiddenCampaign: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        //var query = " DELETE FROM CAMPAIGN WHERE CAMPAIGN_CODE = ? ";
        var query = "UPDATE CAMPAIGN SET USE_YN = 'Y' WHERE CAMPAIGN_CODE = ?";

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
        var query = " call sp_CAMPAIGN_QUESTION_GROUP_UPDATE(?, ?, ?, ?) ";

        var params = [];
        for(var i = 0; i<jsonData.length; i++) {
            params = [];
            params.push(campaign_code);
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
    ,sp_CAMPAIGN_QUOTA_SEX: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUOTA_SEX(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_QUOTA_AREA: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUOTA_AREA(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,quotaAGESelect: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CAMPAIGN_QUOTA_AGE WHERE CAMPAIGN_CODE = ? ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    /*
    ,sp_CAMPAIGN_QUOTA_MONEY: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUOTA_MONEY(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    */
    ,sp_CAMPAIGN_QUOTA_MONEY: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUOTA_MONEY(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    /*
    ,sp_CAMPAIGN_QUOTA_END_MONEY: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUOTA_END_MONEY(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }*/
    ,sp_CAMPAIGN_QUOTA_SAVE: function(campaign_code, sex, age_start, age_end, area, money_start, money_end, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_QUOTA_SAVE(?, ?, ?, ?, ?, ?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(sex);
        params.push(age_start);
        params.push(age_end);
        params.push(area);
        params.push(money_start);
        params.push(money_end);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_RAWDATA: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_RAWDATA(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_LIST_END: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_LIST_END() ";
        var params = [];

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,del_CAMPAIGN_QUEST: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM CAMPAIGN_QUEST WHERE CAMPAIGN_CODE = ? ";
        var params = [];

        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
}

module.exports = mcampaign;