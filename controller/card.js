/**
 * Created by kwangheejung on 2017. 9. 20..
 */
var express = require('express');

var router = express.Router();

var mcard = require("../model/mcard");
var moment = require('moment');


router.get("/list", function(req,res) {
    res.render('card/list', {});
});

router.put("/list", function(req, res) {
    const card_category = req.body.card_category;

    mcard.sp_BP3_CARD_LIST(card_category, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0];

        res.send(data);
    });
});

router.post("/list", function(req, res) {
    const card_seq = req.body.card_seq;
    const card_category = req.body.card_category;
    const card_title = req.body.card_title;
    const card_command = req.body.card_command;
    const card_contents = req.body.card_contents;

    console.log("OK");

    mcard.sp_BP3_CARD_SAVE(card_category, card_title, card_command, card_contents, card_seq, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0][0];

        res.send(data);
    });
});

router.delete("/list", function(req, res) {
    const card_seq = req.body.card_seq;

    mcard.sp_BP3_CARD_DELETE(card_seq, function(err, rows) {
        if(err) {
            console.log(err);
        }

        var data = rows[0][0];

        res.send(data);
    });
});

module.exports = router;