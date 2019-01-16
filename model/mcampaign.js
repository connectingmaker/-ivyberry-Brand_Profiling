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


    ,sp_CAMPAIGN_SAVE_20180618: function(campaign_code, campaign_title, campaign_title_en, campaign_title_cn, campaign_desc, campaign_desc_en, campaign_desc_cn, campaign_startdate, campaign_enddate, category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_SAVE_20180618(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_CAMPAIGN_COPY: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_COPY(?)";
        var params = [];
        params.push(campaign_code);

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
    ,get_campaign_brand_title: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CAMPAIGN_BRAND_TITLE WHERE CAMPAIGN_CODE = ?";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_BRAND_TITLE_SAVE: function(campaign_code, subject, selected_min, selected_max, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_BRAND_TITLE_SAVE(?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(subject);
        params.push(selected_min);
        params.push(selected_max);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_BRAND_TITLE_SAVE_20180727: function(campaign_code, subject, subject_en, subject_cn, selected_min, selected_max, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_BRAND_TITLE_SAVE_20180727(?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(subject);
        params.push(subject_en);
        params.push(subject_cn);
        params.push(selected_min);
        params.push(selected_max);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,get_campaign_count: function(campaign_ing, searchName, callback) {
        var connection = mysql_dbc.init();
        if(campaign_ing == "") {
            var query = " SELECT COUNT(*) TOTAL FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) WHERE C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
            }
            query += " AND C.CATEGORY_CODE NOT IN('A000', 'B000') ";
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
            query += " AND C.CATEGORY_CODE NOT IN('A000', 'B000') ";
            query += " ORDER BY C.INSERT_DATETIME DESC ";
            var params = [];
            params.push(campaign_ing);

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        }
    }
    ,get_campaign_list: function(campaign_ing, page, searchName, sorting, sortingtype, callback) {
        var connection = mysql_dbc.init();
        if(campaign_ing == "") {
            var query = " SELECT C.CAMPAIGN_CODE, C.CAMPAIGN_TITLE, C.CAMPAIGN_DESC, C.CATEGORY_CODE, FROM_UNIXTIME(C.CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(C.CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, C.CAMPAIGN_ING, CASE C.CAMPAIGN_ING WHEN 'N' THEN '대기' WHEN 'S' THEN '진행중' WHEN 'E' THEN '완료' END CAMPAIGN_ING_TEXT, C.VIRTUAL_YN, C.JOIN_CNT, BC.CATEGORY_NAME_KO, C.INSERT_DATETIME, C.MODIFY_DATETIME, CASE WHEN C.CATEGORY_CODE = 'A000' THEN (SELECT COUNT(*) FROM bp3.BP3_SURVEY_DATA WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE = 'E') ELSE (SELECT COUNT(*) FROM DATA_JOIN WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE='E' AND QUEST_NUM=1) END JOIN_DATA FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) ";
            query += " WHERE C.USE_YN='N' ";
            if(searchName != "") {
                query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
            }

            query += " AND C.CATEGORY_CODE NOT IN('B000') ";

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
            console.log(query);
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
            query += " AND C.CATEGORY_CODE NOT IN('B000') ";
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

            console.log(query);


            var params = [];
            params.push(campaign_ing);

            var data = connection.query(query, params, callback);
            connection.end();
            return data;
        }
    }
    ,get_campaign_count_hide: function(searchName, callback) {
        var connection = mysql_dbc.init();

        var query = " SELECT COUNT(*) TOTAL FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) WHERE C.USE_YN='Y' ";
        if(searchName != "") {
            query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
        }
        query += " AND C.CATEGORY_CODE NOT IN('A000', 'B000') ";
        query += " ORDER BY C.INSERT_DATETIME DESC ";
        var params = [];

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,get_campaign_list_hide: function(page, searchName, sorting, sortingtype, callback) {
        var connection = mysql_dbc.init();

        var query = " SELECT C.CAMPAIGN_CODE, C.CAMPAIGN_TITLE, C.CAMPAIGN_DESC, C.CATEGORY_CODE, FROM_UNIXTIME(C.CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(C.CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, C.CAMPAIGN_ING, CASE C.CAMPAIGN_ING WHEN 'N' THEN '대기' WHEN 'S' THEN '진행중' WHEN 'E' THEN '완료' END CAMPAIGN_ING_TEXT, C.VIRTUAL_YN, C.JOIN_CNT, BC.CATEGORY_NAME_KO, C.INSERT_DATETIME, C.MODIFY_DATETIME , CASE WHEN C.CATEGORY_CODE = 'A000' THEN (SELECT COUNT(*) FROM bp3.BP3_SURVEY_DATA WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE = 'E') ELSE (SELECT COUNT(*) FROM DATA_JOIN WHERE CAMPAIGN_CODE = C.CAMPAIGN_CODE AND ENDTYPE='E' AND QUEST_NUM=1) END JOIN_DATA FROM CAMPAIGN C JOIN BRAND_CATEGORY BC ON(C.CATEGORY_CODE = BC.CATEGORY_CODE) ";
        query += " WHERE C.USE_YN='Y' ";
        if(searchName != "") {
            query += " AND C.CAMPAIGN_TITLE LIKE '%" + searchName + "%' ";
        }

        query += " AND C.CATEGORY_CODE NOT IN('A000', 'B000') ";


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
    ,testReset: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM bp3.BP3_SURVEY_DATA_Q WHERE UID ='99999999999999999001' AND CAMPAIGN_CODE = ? ;";
            query += " DELETE FROM bp3.BP3_SURVEY_DATA_SQ WHERE UID ='99999999999999999001' AND CAMPAIGN_CODE = ? ;";
            query += " DELETE FROM bp3.BP3_SURVEY_DATA WHERE UID ='99999999999999999001' AND CAMPAIGN_CODE = ? ;";

        //console.log(query);
        var params = [];
        params.push(campaign_code);
        params.push(campaign_code);
        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,get_campaign_select: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT CAMPAIGN_CODE, CAMPAIGN_TITLE, CAMPAIGN_TITLE_EN, CAMPAIGN_TITLE_CN, CAMPAIGN_DESC, CAMPAIGN_DESC_EN, CAMPAIGN_DESC_CN, CATEGORY_CODE, FROM_UNIXTIME(CAMPAIGN_STARTDATE) AS CAMPAIGN_STARTDATE, FROM_UNIXTIME(CAMPAIGN_ENDDATE) AS CAMPAIGN_ENDDATE, CAMPAIGN_ING, VIRTUAL_YN, JOIN_CNT, POINT_LIMIT, INSERT_DATETIME, MODIFY_DATETIME, BRAND_SKIP FROM CAMPAIGN WHERE CAMPAIGN_CODE = ? ";



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
    ,del_CAMPAIGN_BRAND_POOL: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM CAMPAIGN_BRAND_POOL WHERE CAMPAIGN_CODE = ? ";
        var params = [];
        params.push(campaign_code);
        console.log("쿼리실행");
        var data = connection.query(query,params,callback);
        connection.end();

        console.log("쿼리성공");
        return data;
    }
    ,save_CAMPAIGN_BRAND_POOL_SAVE: function(campaign_code, detail_brand_code, callback) {
        console.log("상세데이터 INSERT");
        var connection = mysql_dbc.init();
        var query = " INSERT INTO CAMPAIGN_BRAND_POOL SELECT ?, ? ";

        var params = [];
        var data = detail_brand_code.split(",");
        for(var i = 0; i<data.length; i++) {
            params = [];
            params.push(campaign_code);
            params.push(data[i]);


            console.log(campaign_code + "///" + data[i]);

            if(i == data.length - 1) {
                var data = connection.query(query, params, callback);
                connection.end();
                return true;
            } else {
                connection.query(query, params);
            }


        }

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
    ,sp_CAMPAIGN_GRADE_IN_JOIN_CNT_UPDATE: function(campaign_code, join_cnt, grade_text, point_limit, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_GRADE_IN_JOIN_CNT_UPDATE(?, ?, ?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(join_cnt);
        params.push(grade_text);
        params.push(point_limit);

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
    ,sp_CAMPAIGN_RAWDATA: function(campaign_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_RAWDATA(?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(quest_num);


        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_LIST_END_CNT: function(searchName, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_LIST_END_CNT(?) ";
        var params = [];
        params.push(searchName);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }


    ,sp_CAMPAIGN_LIST_END: function(start, searchName, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_LIST_END(?,?) ";
        var params = [];
        params.push(start);
        params.push(searchName);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_LIST_END_DATA: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_LIST_END_DATA(?) ";
        var params = [];
        params.push(campaign_code);

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
    ,sp_CAMPAIGN_USER_JOIN_LIST:function(campaign_code, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_USER_JOIN_LIST(?, ?) ";
        var params = [];

        params.push(campaign_code);
        params.push(quest_num);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,CAMPAIGN_CERTAIGN_LIST: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CAMPAIGN_CERTAIGN_UID WHERE CAMPAIGN_CODE = ? ORDER BY INSERT_DATETIME ASC ";
        var params = [];

        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,CAMPAIGN_CERTAIGN_DELETE:function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM  CAMPAIGN_CERTAIGN_UID WHERE CAMPAIGN_CODE = ? ";
        var params = [];

        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_CAMPAIGN_CERTAIGN_SAVE:function(campaign_code, uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_CERTAIGN_SAVE(?, ?) ";
        var params = [];

        params.push(campaign_code);
        params.push(uid);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,CAMPAIGN_SKIP_YN: function(campaign_code, skip_yn, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE CAMPAIGN SET BRAND_SKIP = ? WHERE CAMPAIGN_CODE = ?  ";
        var params = [];
        params.push(skip_yn);

        params.push(campaign_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_USER_RAWDATA: function(campaign_code, uid, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " CALL sp_USER_RAWDATA(?, ?, ?)  ";
        var params = [];
        params.push(campaign_code);
        params.push(uid);
        params.push(quest_num);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }



}

module.exports = mcampaign;