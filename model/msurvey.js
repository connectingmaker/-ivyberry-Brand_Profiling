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
    ,sp_SURVEY_START_20181028: function(campaign_code, uid, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_START_20181028(?, ?, ?) ";
        var params = [];
        params.push(campaign_code, uid, quest_num);
        // console.log(params);


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
    ,surveyPageCnt: function(seq, campaign_code, quest_num, page, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_PAGE_CNT(?, ?, ?, ?) ";
        var params = [];
        params.push(seq, campaign_code, quest_num, page);

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
    ,
    surveyQA: function(q_code, callback) {
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
    ,brandDel: function(uid, quest_num, campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_BRAND_DEL(?, ?, ?)";

        var params = [];
        params.push(uid);

        params.push(quest_num);
        params.push(campaign_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,brandSave: function(seq, campaign_code, uid, quest_num, brandData, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_BRAND_SAVE(?, ?, ?, ?, ?) ";

        var params = [];
        for(var i = 0; i<brandData.length; i++) {
            params = [];
            params.push(seq);
            params.push(campaign_code);
            params.push(uid);
            params.push(quest_num);
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
    ,brandListSelect: function(uid, quest_num, campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_BRAND_SELECT(?, ?, ?) ";
        var params = [];
        params.push(uid);
        params.push(quest_num);
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
    ,surveyEnd: function(campaign_code, quest_num, seq, uid, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_SURVEY_END(?, ?, ?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(quest_num);
        params.push(seq);
        params.push(uid);

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
    ,sp_RAWDATA_DELETE: function(campaign_code, uid, quest_num, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_RAWDATA_DELETE(?, ?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(uid);
        params.push(quest_num);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }

    ,sp_BP3_SURVEY_SQA_LIST: function(campaign_code, sq_code, callback) {
        var connection = mysql_dbc.init();
        var query = " CALL bp3.sp_BP3_SURVEY_SQA_LIST(?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(sq_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_BP3_SQ_QUESTION_Q_SELECT: function(campaign_code, sq_code, callback) {
        var connection = mysql_dbc.init();
        var query = " CALL bp3.sp_BP3_SQ_QUESTION_Q_SELECT(?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(sq_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_BP3_SQ_QUESTION_QA_LIST: function(campaign_code, sq_code, callback) {
        var connection = mysql_dbc.init();
        var query = " CALL bp3.sp_BP3_SURVEY_SQA_LIST(?, ?)";
        var params = [];
        params.push(campaign_code);
        params.push(sq_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_SURVEY_DATA_SQ_DELETE: function(campaign_code, uid, sq_code, callback) {
        var connection = mysql_dbc.init();

        var params = [];
        var query = "call bp3.sp_BP3_SURVEY_DATA_SQ_DELETE(?,?,?)";
        params.push(campaign_code);
        params.push(uid);
        params.push(sq_code);


        var data = connection.query(query,params,callback);
        connection.end();
        return data;
        // db.sp_rowArray("sp_BP3_SURVEY_DATA_SQ_DELETE", params, function(err, rows) {
        //     callback(err, rows);
        // });
    }
    ,sp_BP3_SURVEY_DATA_SQ_SAVE: function(campaign_code, uid, sq_code, data, callback) {
        var connection = mysql_dbc.init();
        var query = " CALL bp3.sp_BP3_SURVEY_DATA_SQ_SAVE(?, ?, ?, ?)";
        var params = [];
        for(var i = 0; i<data.length; i++) {
            params = [];
            params.push(campaign_code);
            params.push(uid);
            params.push(sq_code);
            params.push(data[i].qaCode);
            if(i == data.length - 1) {
                var data = connection.query(query,params,callback);


                connection.end();
                return data;
            } else {
                connection.query(query,params);
            }
        }
    }
    ,sp_BP3_SURVEY_DATA_SQ_NEXT: function(campaign_code, uid, sq_code, callback) {
        var connection = mysql_dbc.init();
        var params = [];
        var query = "call bp3.sp_BP3_SURVEY_DATA_SQ_NEXT(?,?,?)";
        params.push(campaign_code);
        params.push(uid);
        params.push(sq_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_SURVEY_Q_SELECT: function(campaign_code, q_code, callback) {
        var connection = mysql_dbc.init();
        var params = [];
        var query = "call bp3.sp_BP3_SURVEY_Q_SELECT(?,?)";
        params.push(campaign_code);
        params.push(q_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_SURVEY_QA_LIST: function(campaign_code, uid, q_code, callback) {
        var connection = mysql_dbc.init();
        var params = [];
        var query = "call bp3.sp_BP3_SURVEY_QA_LIST(?,?,?)";
        params.push(campaign_code);
        params.push(uid);
        params.push(q_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_SURVEY_QA_IMG_LIST: function(campaign_code, uid, q_code, callback) {
        var connection = mysql_dbc.init();
        var params = [];
        var query = "call bp3.sp_BP3_SURVEY_QA_IMG_LIST(?,?,?)";
        params.push(campaign_code);
        params.push(uid);
        params.push(q_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_SURVEY_QA_IMG_LIST_LR: function(campaign_code, uid, q_code, lr, callback) {
        var connection = mysql_dbc.init();
        var params = [];
        var query = "call bp3.sp_BP3_SURVEY_QA_IMG_LIST_LR(?,?,?,?)";
        params.push(campaign_code);
        params.push(uid);
        params.push(q_code);
        params.push(lr);


        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP2_SURVEY_Q_DATA_DELETE: function(campaign_code, uid, q_code, callback) {
        var connection = mysql_dbc.init();
        var query = " CALL bp3.sp_BP2_SURVEY_Q_DATA_DELETE(?, ?, ?)";
        var params = [];

        params.push(campaign_code);
        params.push(uid);
        params.push(q_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;

    }
    ,sp_BP2_SURVEY_NEXT_Q: function(campaign_code, uid, q_code, qaData, callback) {
        var connection = mysql_dbc.init();
        var query = " CALL bp3.sp_BP2_SURVEY_NEXT_Q(?, ?, ?, ?, ?, ?, ?)";
        var params = [];
        if(qaData.length == 0) {
            params = [];
            params.push(campaign_code);
            params.push(uid);
            params.push(q_code);
            params.push("");
            params.push("");
            params.push("");
            params.push("");

            var data = connection.query(query,params,callback);


            connection.end();
            return data;

        } else {
            for(var i = 0; i<qaData.length; i++) {
                params = [];
                params.push(campaign_code);
                params.push(uid);
                params.push(q_code);
                params.push(qaData[i].qa_code);
                params.push(qaData[i].qa_text);
                params.push(qaData[i].category_code);
                params.push(qaData[i].code_gubun);

                console.log(params);


                if(i == qaData.length - 1) {
                    var data = connection.query(query,params,callback);


                    connection.end();
                    return data;
                } else {
                    connection.query(query,params);
                }
            }
        }
    }
}
module.exports = msurvey;