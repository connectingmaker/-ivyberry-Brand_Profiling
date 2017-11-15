/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();

var msurvey = {

    surveyStart: function(campaign_code, uid, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_START(?, ?, ?) ";
        var params = [];
        params.push(campaign_code, uid, quest_num);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,surveyPage: function(campaign_code, quest_num, page, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_PAGE(?, ?, ?) ";
        var params = [];
        params.push(campaign_code, quest_num, page);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,surveyPageCheck: function(campaign_code, quest_num, page_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_PAGE_CHECK(?, ?, ?) ";
        var params = [];
        params.push(campaign_code, quest_num, page_num);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,surveyQA: function(q_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM QUESTION_QA WHERE Q_CODE = ? ORDER BY QA_ORDER ASC";
        var params = [];
        params.push(q_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,brandList: function(campaign_code, seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_BRAND(?, ?) ";
        var params = [];
        params.push(campaign_code, seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,brandDel: function(seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_BRAND_DEL(?)";

        var params = [];
        params.push(seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,brandSave: function(seq, brandData, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_BRAND_SAVE(?, ?) ";

        var params = [];
        for(var i = 0; i<brandData.length; i++) {
            params = [];
            params.push(seq);
            params.push(brandData[i].brand_code);


            if(i == brandData.length - 1) {

                var data = connection.query(query, params, callback);
                connection.end();
                return data;
            } else {
                var data = connection.query(query, params);
            }
        }
    }
    ,brandListSelect: function(seq, campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_BRAND_SELECT(?, ?) ";
        var params = [];
        params.push(seq);
        params.push(campaign_code)

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,rowDataDel: function(seq, q_code, callback) {
        var connection = mysql_dbc.init();
        var query = " DELETE FROM DATA_QUESTION_ROW WHERE SEQ = ? AND Q_CODE = ? ";
        var params = [];
        params.push(seq);
        params.push(q_code)

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,multirowData: function(seq, q_code, qa_code, qa_text, quest_num, question_type, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_DATA(?, ?, ?, ?, ?, ?, ?, ?) ";

        var params = [];
        for(var i = 0; i<qa_code.length; i++) {
            params = [];
            params.push(seq);
            params.push(q_code);
            params.push(qa_code[i].qaCode);
            if(qa_code[i].qaText == undefined) {
                params.push('');
            } else {
                params.push(qa_code[i].qaText);
            }
            params.push('');
            params.push(qa_code[i].brandCode)
            params.push(quest_num);
            params.push(question_type);


            if(i == qa_code.length - 1) {

                var data = connection.query(query, params, callback);
                connection.end();
                return data;
            } else {
                var data = connection.query(query, params);
            }
        }
    }
    ,surveyEnd: function(campaign_code, quest_num, seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_END(?, ?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(quest_num);
        params.push(seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileCnt: function(uid, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT COUNT(*) TOTAL FROM MEMBER_DETAIL WHERE UID = ? ";
        var params = [];
        params.push(uid)

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileNameUpdate: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE MEMBER SET USERNAME=? WHERE UID = ?  ";
        var params = [];
        params.push(data);
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileSexInsert: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " INSERT INTO MEMBER_DETAIL(UID, SEX) VALUES (?, ?)  ";
        var params = [];
        params.push(uid);
        params.push(data);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileSexUpdate: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE MEMBER_DETAIL SET SEX = ? WHERE UID = ?  ";
        var params = [];

        params.push(data);
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileBrithdayInsert: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " INSERT INTO MEMBER_DETAIL(UID, BRITHDAY) VALUES (?, ?)  ";
        var params = [];
        params.push(uid);
        params.push(data);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileBrithdayUpdate: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE MEMBER_DETAIL SET BRITHDAY = ? WHERE UID = ?  ";
        var params = [];

        params.push(data);
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileAreaInsert: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " INSERT INTO MEMBER_DETAIL(UID, SIDO) VALUES (?, ?)  ";
        var params = [];
        params.push(uid);
        params.push(data);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileAreaUpdate: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE MEMBER_DETAIL SET SIDO = ? WHERE UID = ?  ";
        var params = [];
        params.push(data);
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileMoneyInsert: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " INSERT INTO MEMBER_DETAIL(UID, MONTH_MONEY) VALUES (?, ?)  ";
        var params = [];
        params.push(uid);
        params.push(data);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,profileMoneyUpdate: function(uid, data, callback) {
        var connection = mysql_dbc.init();
        var query = " UPDATE MEMBER_DETAIL SET MONTH_MONEY = ? WHERE UID = ?  ";
        var params = [];
        params.push(data);
        params.push(uid);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
}
module.exports = msurvey;