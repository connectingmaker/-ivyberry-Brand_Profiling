/**
 * Created by jccho on 2018. 8. 22..
 */
'use strict';

var mysql_dbc = require('../module/db_con')();


var msurveyresult = {
    sp_BP3_PROJECT_RESULT_TOTAL: function(campaign_code, callback) {

        var connection = mysql_dbc.init();
        var query = " call bp3.sp_BP3_PROJECT_RESULT_TOTAL(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;


        // var params = [];
        // params.push(campaign_code);
        //
        // db.sp_rowArray("bp3.sp_BP3_PROJECT_RESULT_TOTAL", params, function(err, rows) {
        //     callback(err, rows);
        // });
    }
    ,sp_BP3_PROJECT_RESULT: function (campaign_code, callback) {

        var connection = mysql_dbc.init();
        var query = " call bp3.sp_BP3_PROJECT_RESULT(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;


        // var params = [];
        // params.push(campaign_code);
        //
        // db.sp_resultArray("bp3.sp_BP3_PROJECT_RESULT", params, function(err, rows) {
        //     callback(err, rows);
        // });

    }

    ,sp_BP3_PROJECT_RESULT_QA_DATA: function(campaign_code, q_code, callback) {


        var connection = mysql_dbc.init();
        var query = " call bp3.sp_BP3_PROJECT_RESULT_QA_DATA(?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(q_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
        // var params = [];
        // params.push(campaign_code);
        // params.push(q_code);
        //
        // db.sp_resultArray("bp3.sp_BP3_PROJECT_RESULT_QA_DATA", params, function(err, rows) {
        //     callback(err, rows);
        // });
    }
    ,sp_BP3_PROJECT_RESULT_QA_IMG_DATA: function(campaign_code, q_code, callback) {

        var connection = mysql_dbc.init();
        var query = " call bp3.sp_BP3_PROJECT_RESULT_QA_IMG_DATA(?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(q_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;

        // var params = [];
        // params.push(campaign_code);
        // params.push(q_code);
        //
        // db.sp_resultArray("bp3.sp_BP3_PROJECT_RESULT_QA_IMG_DATA", params, function(err, rows) {
        //     callback(err, rows);
        // });
    }
    ,sp_BP3_PROJECT_RESULT_QA_IMG_DATA_BP2: function(campaign_code, q_code, callback) {

        var connection = mysql_dbc.init();
        var query = " call bp3.sp_BP3_PROJECT_RESULT_QA_IMG_DATA_BP2(?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(q_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;

        // var params = [];
        // params.push(campaign_code);
        // params.push(q_code);
        //
        // db.sp_resultArray("bp3.sp_BP3_PROJECT_RESULT_QA_IMG_DATA", params, function(err, rows) {
        //     callback(err, rows);
        // });
    }

    ,sp_BP3_QUESTION_QA_IMG_LIST: function(campaign_code, q_code, left_right, callback) {

        var connection = mysql_dbc.init();
        var query = " call bp3.sp_BP3_QUESTION_QA_IMG_LIST(?, ?) ";
        var params = [];
        params.push(campaign_code);
        params.push(q_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;



        // var params = [];
        // params.push(campaign_code);
        // params.push(q_code);
        // params.push(left_right);
        //
        // db.sp_resultArray("sp_BP3_QUESTION_QA_IMG_LIST", params, function(err, data) {
        //     console.log("리스트");
        //     callback(err, data);
        // });
    }
};

module.exports = msurveyresult;
