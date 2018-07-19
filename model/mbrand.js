/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();




var mbrand = {
    /**** 브랜드 카테고리 등록 ********/
    sp_BRAND_CATEGORY_SAVE: function(category_code, category_name_ko, category_name_en, category_name_cn, memo, etc, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BRAND_CATEGORY_SAVE(?, ?, ?, ?, ?, ?)";
        var params = [];
        params.push(category_code);
        params.push(category_name_ko);
        params.push(category_name_en);
        params.push(category_name_cn);
        params.push(memo);
        params.push(etc);


        var data = connection.query(query,params,callback);
        connection.end();
        return data;


    }
    /**** 브랜드 대분류 SELECT *********/
    ,get_BrandCategorySelect: function(category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " * ";
        query += " ,0 AS CNT ";
        query += " FROM BRAND_CATEGORY WHERE CATEGORY_CODE = ? ";
        var params = [];
        params.push(category_code);


        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    /**** 브랜드 중분류 SELECT *********/
    ,get_BrandCategorySubSelect: function(detail_category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " * ";
        query += " ,0 AS CNT ";
        query += " FROM BRAND_CATEGORY_SUB WHERE DETAIL_CATEGORY_CODE = ? ";
        var params = [];
        params.push(detail_category_code);

        var data = connection.query(query,params,callback);
        connection.end();
        return data;
    }
    /**** 브랜드 대분류 리스트 *********/
    ,get_BrandCategoryList: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * ";
        query += " , 0 AS CNT"
        query += " FROM BRAND_CATEGORY WHERE CATEGORY_CODE NOT IN ('9999', 'A000', 'B000') ORDER BY CATEGORY_CODE ASC ";

        var data = connection.query(query, callback);
        connection.end();
        return data;
    }

    /**** 브랜드 대분류 리스트(브랜드 서브리스트) *********/
    ,get_BrandCategoryList_BRAND: function(callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT * ";
        query += " , IFNULL((SELECT GROUP_CONCAT(BRAND_NAME_KO) FROM BRAND_CATEGORY_SUB WHERE CATEGORY_CODE = BC.CATEGORY_CODE ORDER BY DETAIL_CATEGORY_CODE ASC),'') AS BRAND_LIST"
        query += " FROM BRAND_CATEGORY BC WHERE BC.CATEGORY_CODE <> '9999' ORDER BY BC.CATEGORY_CODE ASC ";

        var data = connection.query(query, callback);
        connection.end();
        return data;
    }

    /**** 브랜드 중분류 리스트 *********/
    ,get_BrandCategoryDetailList: function(category_code, callback) {
        var connection = mysql_dbc.init();
        var query = " SELECT ";
        query += " * ";
        query += " ,0 AS CNT ";
        query += " FROM BRAND_CATEGORY_SUB WHERE CATEGORY_CODE = ? ";
        var params = [];
        params.push(category_code);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_BRAND_CATEGORY_SUB_SAVE: function(detail_category_code, category_code, brand_name_ko, brand_name_en, brand_name_cn, etc, memo, callback) {
        var connection = mysql_dbc.init();
        var params = [];
        var query = " call sp_BRAND_CATEGORY_SUB_SAVE(?, ?, ?, ?, ?, ?, ?) ";

        params.push(detail_category_code);
        params.push(category_code);
        params.push(brand_name_ko);
        params.push(brand_name_en);
        params.push(brand_name_cn);
        params.push(etc);
        params.push(memo);

        var data = connection.query(query, params, callback);
        connection.end();
    }
    /**** 브랜드 대분류 삭제 ***********/
    ,del_BrandCategory: function(category_code, callback) {
        var connection = mysql_dbc.init();
        var query = "call sp_BRAND_CATEGORY_DELETE(?) ";
        var params = [];
        params.push(category_code);

        var data = connection.query(query, params, callback);
        connection.end();
    }
    /**** 브랜드 중분류 삭제 ***********/
    ,del_BrandCategorySub: function(detail_category_code, callback) {
        var connection = mysql_dbc.init();
        var query = "DELETE FROM BRAND_CATEGORY_SUB WHERE DETAIL_CATEGORY_CODE = ? ";
        var params = [];
        params.push(detail_category_code);

        var data = connection.query(query, params, callback);
    }

    ,sp_CAMPAIGN_BRAND_LIST: function(campaign_code, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_CAMPAIGN_BRAND_LIST(?) ";
        var params = [];
        params.push(campaign_code);

        var data = connection.query(query, params, callback);
    }

}

module.exports = mbrand;