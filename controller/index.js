var express = require('express');
var router = express.Router();
var muser = require("../model/muser");

/* admin login */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout/single_page', "layout extractScripts": true });
});

router.post('/', function(req, res, next) {
  var adminid = req.body.adminid;
  var adminpw = req.body.adminpw;
  var err_code = {};
  var dataReturn = {};
    muser.getAdminMemberSelect(adminid,adminpw, function(err, rows) {
      if(err) {
        console.log("error");
          err_code = {
            "err_code" : "db_error"
            ,"err_msg" : "디비접속 에러"
            , "data" : ""
          };
      } else {

        if(rows.length <= 0) {
          err_code = {
            "err_code" : "999"
            ,"err_msg" : "아이디 및 패스워드가 일치하지 않습니다"
            , "data" : ""
          };
        } else {
          //res.send(rows[0]);
          err_code = {
            "err_code" : "000"
            ,"err_msg" : ""
            , "data" : rows[0]
          }

        }
      }

      console.log(err_code);
      res.send(err_code);

    });

});

module.exports = router;
