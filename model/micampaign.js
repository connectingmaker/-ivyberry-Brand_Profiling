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
    ,sp_BP3_CAMPAIGN_SELECT: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CAMPAIGN_SELECT(?)";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query, params, callback);
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
    ,sp_BP3_SQ_QUESTION_Q_SAVE:function(campaign_code, sq_code, sq_title, sq_layout, sq_checked_min, sq_checked_max, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_SQ_QUESTION_Q_SAVE(?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(sq_code);
        params.push(sq_title);
        params.push(sq_layout);
        params.push(sq_checked_min);
        params.push(sq_checked_max);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_BP3_SQ_QUESTION_QA_SAVE: function(campaign_code, sq_code, sqaList, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_SQ_QUESTION_QA_SAVE(?, ?, ?, ?, ?) ";

        var params = [];
        for(var i = 0; i<sqaList.length; i++) {
            params = [];
            params.push(campaign_code);
            params.push(sq_code);
            params.push(sqaList[i].SQA_CODE);
            params.push(sqaList[i].SQA_TITLE);
            params.push(sqaList[i].SCOUT);

            if(i == sqaList.length - 1) {
                var data = connection.query(query, params, callback);
                connection.end();
                return data;
            } else {
                var data = connection.query(query, params);
            }

        }
    }
    ,get_BP3_SQ_QUESTION_Q_LIST: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT *, ( SELECT GROUP_CONCAT(CONCAT(SQA_CODE,'///',SQA_TITLE,'///',SQA_ORDER,'///',SCOUT) ORDER BY SQQA.SQA_ORDER ASC SEPARATOR '|') FROM BP3_SQ_QUESTION_QA SQQA WHERE SQQA.CAMPAIGN_CODE = SQQ.CAMPAIGN_CODE AND SQQA.SQ_CODE = SQQ.SQ_CODE ) SQA FROM BP3_SQ_QUESTION_Q SQQ WHERE SQQ.CAMPAIGN_CODE = ? ORDER BY SQQ.SQ_CODE ASC ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,get_BP3_SQ_QUESTION_Q_SELECT: function(campaign_code, sq_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT *, ( SELECT GROUP_CONCAT(CONCAT(SQA_CODE,'///',SQA_TITLE,'///',SQA_ORDER,'///',SCOUT) ORDER BY SQQA.SQA_ORDER ASC SEPARATOR '|') FROM BP3_SQ_QUESTION_QA SQQA WHERE SQQA.CAMPAIGN_CODE = SQQ.CAMPAIGN_CODE AND SQQA.SQ_CODE = SQQ.SQ_CODE ) SQA FROM BP3_SQ_QUESTION_Q SQQ WHERE SQQ.CAMPAIGN_CODE = ? AND SQQ.SQ_CODE = ? ORDER BY SQQ.SQ_CODE ASC ";
        var params = [];
        params.push(campaign_code);
        params.push(sq_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_BP3_SQ_QUESTION_Q_DELETE: function(campaign_code, sq_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_SQ_QUESTION_Q_DELETE(?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(sq_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,get_BP3_SQ_QUESTION_QA_LIST: function(campaign_code, sq_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM BP3_SQ_QUESTION_QA WHERE CAMPAIGN_CODE = ? AND SQ_CODE = ? ORDER BY SQA_ORDER ASC ";
        var params = [];
        params.push(campaign_code);
        params.push(sq_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,set_BP_SQ_QUESTION_QA_SCOUT: function(campaign_code, sq_code, sqa_code, scout, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE BP3_SQ_QUESTION_QA SET SCOUT = ? WHERE CAMPAIGN_CODE = ? AND SQ_CODE = ? ";
        var params = [];
        params.push(scout);
        params.push(campaign_code);
        params.push(sq_code);
        params.push(scout);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,delete_BP3_SQ_QUESTION_QA_DELETE: function(campaign_code, sq_code, sqa_code, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM BP3_SQ_QUESTION_QA WHERE CAMPAIGN_CODE = ? AND SQ_CODE = ? AND SQA_CODE = ? ";
        var params = [];
        params.push(campaign_code);
        params.push(sq_code);
        params.push(sqa_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
};

module.exports = micampaign;