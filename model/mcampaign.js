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
        var query = " SELECT * FROM CAMPAIGN WHERE CAMPAIGN_ING = ? ORDER BY INSERT_DATETIME DESC ";
        var params = [];
        params.push(campaign_ing);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_campaign_select: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CAMPAIGN WHERE CAMPAIGN_CODE = ? ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }


}

module.exports = mcampaign;