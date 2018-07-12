/**
 * Created by kwangheejung on 2017. 9. 18..
 */
var mysql_dbc = require('../module/db_con')();





var mcode = {
    /**** 코드 리스트 ********/
    getCodeGradeList: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * FROM CODE_GRADE WHERE CODE_GRADE != 99 ORDER BY CODE_GRADE ASC";
        var params = [];
        var data = connection.query(query,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_CODE_IMAGE_CATEGORY_SAVE: function(category_code, category_name, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CODE_IMAGE_CATEGORY_SAVE(?,?) ";
        var params = [];
        params.push(category_code);
        params.push(category_name);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_CODE_IMAGE_CATEGORY_LIST: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CODE_IMAGE_CATEGORY_LIST() ";
        var params = [];
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_CODE_IMAGE_CATEGORY_SUB_LIST:function(category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CODE_IMAGE_CATEGORY_SUB_LIST(?) ";
        var params = [];
        params.push(category_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    ,sp_BP3_CODE_IMAGE_CATEGORY_DELETE: function(category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CODE_IMAGE_CATEGORY_DELETE(?) ";
        var params = [];
        params.push(category_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_BP3_CODE_KEYWORD_CATEGORY_SAVE: function(category_code, category_name, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CODE_KEYWORD_CATEGORY_SAVE(?, ?) ";
        var params = [];
        params.push(category_code);
        params.push(category_name);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_BP3_CODE_KEYWORD_CATEGORY_LIST: function(callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CODE_KEYWORD_CATEGORY_LIST() ";
        var params = [];
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

    ,sp_BP3_CODE_KEYWORD_CATEGORY_DELETE: function(category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CODE_KEYWORD_CATEGORY_DELETE(?) ";
        var params = [];
        params.push(category_code);
        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }

}

module.exports = mcode;