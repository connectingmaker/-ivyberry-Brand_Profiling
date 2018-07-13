/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var mysql_dbc = require('../module/db_con')();

var mcard = {
    sp_BP3_CARD_SAVE: function(code_card_category, card_title, card_command, card_contents, card_seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CARD_SAVE(?, ?, ?, ?, ?) ";
        var params = [];

        params.push(code_card_category);
        params.push(card_title);
        params.push(card_command);
        params.push(card_contents);
        params.push(card_seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_BP3_CARD_LIST: function(code_card_category, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CARD_LIST(?) ";
        var params = [];

        params.push(code_card_category);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
    ,sp_BP3_CARD_DELETE: function(card_seq, callback) {
        var connection = mysql_dbc.init();
        var query = " call sp_BP3_CARD_DELETE(?) ";
        var params = [];

        params.push(card_seq);

        var data = connection.query(query, params, callback);
        connection.end();
        return data;
    }
};

module.exports = mcard;