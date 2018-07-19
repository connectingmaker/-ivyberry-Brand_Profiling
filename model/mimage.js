/**
 * Created by jccho on 2018. 7. 13..
 */
var mysql_dbc = require('../module/db_con')();

var mimage = {
    sp_BP3_IMAGE_SAVE: function(code_image_category, image_title,image_filename ,image_seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_IMAGE_SAVE(?, ?, ?, ?) ";
        var params = [];

        params.push(code_image_category);
        params.push(image_title);
        params.push(image_filename);
        params.push(image_seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_BP3_IMAGE_LIST: function(code_image_category, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_IMAGE_LIST(?) ";
        var params = [];

        params.push(code_image_category);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_BP3_IMAGE_DELETE: function(image_seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_IMAGE_DELETE(?) ";
        var params = [];

        params.push(image_seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
};

module.exports = mimage;