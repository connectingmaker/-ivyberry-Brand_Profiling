/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql_dbc = require('../module/db_con')();

var micampaign = {
    sp_BP3_CAMPAIGN_SAVE: function(campaign_code, campaign_title, campaign_title_en, campaign_title_cn, campaign_desc, campaign_desc_en, campaign_desc_cn, campaign_startdate, campaign_enddate, category_code, joincnt, pointlimit, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CAMPAIGN_SAVE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(campaign_title);
        params.push(campaign_title_en);
        params.push(campaign_title_cn);
        params.push(campaign_desc);
        params.push(campaign_desc_en);
        params.push(campaign_desc_cn);
        params.push(campaign_startdate);
        params.push(campaign_enddate);
        params.push(category_code);
        params.push(joincnt);
        params.push(pointlimit);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_CAMPAIGN_POINT: function (campaign_code, finish_point, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CAMPAIGN_POINT(?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(finish_point);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_BP3_CAMPAIGN_STARTPAGE: function(campaign_code, startPage, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CAMPAIGN_STARTPAGE(?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(startPage);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,get_campaign_count_hide: function(searchName, bpType, callback) {
        var connection = mysql_dbc.init();

        var query = " SELECT COUNT(*) TOTAL FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) WHERE C.USE_YN='Y' ";
        if(searchName != "") {
            query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
        }

        switch(bpType) {
            case "bp2":
                query += " AND C.CATEGORY_CODE = 'A000' ";
                break;
            case "bp3":
                query += " AND C.CATEGORY_CODE = 'B000' ";
                break;
        }
        query += " ORDER BY C.INSERT_DATETIME DESC ";
        var params = [];

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,get_campaign_list_hide: function(page, searchName, sorting, sortingtype, bpType, callback) {
        var connection = mysql_dbc.init();

        var query = " SELECT C.CAMPAIGN_CODE, C.CAMPAIGN_TITLE, C.CAMPAIGN_DESC, C.CATEGORY_CODE, FROM_UNIXTIME(C.CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(C.CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, C.CAMPAIGN_ING, CASE C.CAMPAIGN_ING WHEN 'N' THEN '대기' WHEN 'S' THEN '진행중' WHEN 'E' THEN '완료' END CAMPAIGN_ING_TEXT, C.VIRTUAL_YN, C.JOIN_CNT, BC.CATEGORY_NAME_KO, C.INSERT_DATETIME, C.MODIFY_DATETIME , (SELECT COUNT(*) FROM DATA_JOIN WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE='E' AND QUEST_NUM=1) JOIN_DATA FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) ";
        query += " WHERE C.USE_YN='Y' ";
        if(searchName != "") {
            query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
        }


        switch(bpType) {
            case "bp2":
                query += " AND C.CATEGORY_CODE = 'A000' ";
                break;
            case "bp3":
                query += " AND C.CATEGORY_CODE = 'B000' ";
                break;
        }


        if(sorting == "") {
            query += " ORDER BY C.INSERT_DATETIME DESC LIMIT "+page+", 30 ";
        } else {
            if(sorting == "category") {
                query += " ORDER BY BC.CATEGORY_NAME_KO "+sortingtype+" LIMIT "+page+", 30 ";
            }

            if(sorting == "campaign_title") {
                query += " ORDER BY C.CAMPAIGN_TITLE "+sortingtype+" LIMIT "+page+", 30 ";
            }

            if(sorting == "use") {
                query += " ORDER BY C.CAMPAIGN_ING "+sortingtype+" LIMIT "+page+", 30 ";
            }

            if(sorting == "startdate") {
                query += " ORDER BY C.CAMPAIGN_STARTDATE "+sortingtype+" LIMIT "+page+", 30 ";
            }

            if(sorting == "enddate") {
                query += " ORDER BY C.CAMPAIGN_ENDDATE "+sortingtype+" LIMIT "+page+", 30 ";
            }
        }


        var params = [];
        var data = connection.query(query, params, callback);
        connection.end();
        return data;

    }

    ,get_campaign_count: function(campaign_ing, searchName, bpType, callback) {
        var connection = mysql_dbc.init();
        if(campaign_ing == "") {
            var query = " SELECT COUNT(*) TOTAL FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) WHERE C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
            }

            switch(bpType) {
                case "bp2":
                    query += " AND C.CATEGORY_CODE = 'A000' ";
                    break;
                case "bp3":
                    query += " AND C.CATEGORY_CODE = 'B000' ";
                    break;
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
                query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
            }

            switch(bpType) {
                case "bp2":
                    query += " AND C.CATEGORY_CODE = 'A000' ";
                    break;
                case "bp3":
                    query += " AND C.CATEGORY_CODE = 'B000' ";
                    break;
            }


            query += " ORDER BY C.INSERT_DATETIME DESC ";
            var params = [];
            params.push(campaign_ing);

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        }
    }
    ,get_campaign_list: function(campaign_ing, page, searchName, sorting, sortingtype, bpType, callback) {
        var connection = mysql_dbc.init();
        if(campaign_ing == "") {
            var query = " SELECT C.CAMPAIGN_CODE, C.CAMPAIGN_TITLE, C.CAMPAIGN_DESC, C.CATEGORY_CODE, FROM_UNIXTIME(C.CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(C.CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, C.CAMPAIGN_ING, CASE C.CAMPAIGN_ING WHEN 'N' THEN '대기' WHEN 'S' THEN '진행중' WHEN 'E' THEN '완료' END CAMPAIGN_ING_TEXT, C.VIRTUAL_YN, C.JOIN_CNT, BC.CATEGORY_NAME_KO, C.INSERT_DATETIME, C.MODIFY_DATETIME, (SELECT COUNT(*) FROM DATA_JOIN WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE='E' AND QUEST_NUM=1) JOIN_DATA FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) ";
            query += " WHERE C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
            }

            switch(bpType) {
                case "bp2":
                    query += " AND C.CATEGORY_CODE = 'A000' ";
                    break;
                case "bp3":
                    query += " AND C.CATEGORY_CODE = 'B000' ";
                    break;
            }

            if(sorting == "") {
                query += " ORDER BY C.INSERT_DATETIME DESC LIMIT "+page+", 30 ";
            } else {
                if(sorting == "category") {
                    query += " ORDER BY BC.CATEGORY_NAME_KO "+sortingtype+" LIMIT "+page+", 30 ";
                }

                if(sorting == "campaign_title") {
                    query += " ORDER BY C.CAMPAIGN_TITLE "+sortingtype+" LIMIT "+page+", 30 ";
                }

                if(sorting == "use") {
                    query += " ORDER BY C.CAMPAIGN_ING "+sortingtype+" LIMIT "+page+", 30 ";
                }

                if(sorting == "startdate") {
                    query += " ORDER BY C.CAMPAIGN_STARTDATE "+sortingtype+" LIMIT "+page+", 30 ";
                }

                if(sorting == "enddate") {
                    query += " ORDER BY C.CAMPAIGN_ENDDATE "+sortingtype+" LIMIT "+page+", 30 ";
                }
            }

            var params = [];
            params.push();

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        } else {
            var query = " SELECT C.CAMPAIGN_CODE, C.CAMPAIGN_TITLE, C.CAMPAIGN_DESC, C.CATEGORY_CODE, FROM_UNIXTIME(C.CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(C.CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, C.CAMPAIGN_ING, CASE C.CAMPAIGN_ING WHEN 'N' THEN '대기' WHEN 'S' THEN '진행중' WHEN 'E' THEN '완료' END CAMPAIGN_ING_TEXT, C.VIRTUAL_YN, C.JOIN_CNT, BC.CATEGORY_NAME_KO, C.INSERT_DATETIME, C.MODIFY_DATETIME , (SELECT COUNT(*) FROM DATA_JOIN WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE='E' AND QUEST_NUM=1) JOIN_DATA FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) ";
            query += " WHERE C.CAMPAIGN_ING = ? ";
            query += " AND C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
            }

            switch(bpType) {
                case "bp2":
                    query += " AND C.CATEGORY_CODE = 'A000' ";
                    break;
                case "bp3":
                    query += " AND C.CATEGORY_CODE = 'B000' ";
                    break;
            }
            //query += " ORDER BY C.INSERT_DATETIME DESC LIMIT "+page+", 30 ";
            if(sorting == "") {
                query += " ORDER BY C.INSERT_DATETIME DESC LIMIT "+page+", 30 ";
            } else {
                if(sorting == "category") {
                    query += " ORDER BY BC.CATEGORY_NAME_KO "+sortingtype+" LIMIT "+page+", 30 ";
                }

                if(sorting == "campaign_title") {
                    query += " ORDER BY C.CAMPAIGN_TITLE "+sortingtype+" LIMIT "+page+", 30 ";
                }

                if(sorting == "use") {
                    query += " ORDER BY C.CAMPAIGN_ING "+sortingtype+" LIMIT "+page+", 30 ";
                }

                if(sorting == "startdate") {
                    query += " ORDER BY C.CAMPAIGN_STARTDATE "+sortingtype+" LIMIT "+page+", 30 ";
                }

                if(sorting == "enddate") {
                    query += " ORDER BY C.CAMPAIGN_ENDDATE "+sortingtype+" LIMIT "+page+", 30 ";
                }
            }

            var params = [];
            params.push(campaign_ing);

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        }
    }
};

module.exports = micampaign;