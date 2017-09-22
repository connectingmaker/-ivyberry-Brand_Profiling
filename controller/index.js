var express = require('express');
var router = express.Router();
var muser = require("../model/muser");

/* admin login */
router.get('/', function(req, res, next) {
  sess = req.session;
  if(sess.username == undefined) {
    res.render('index', { title: 'Express', layout: 'layout/single_page', "layout extractScripts": true });
  } else {
    res.redirect('/users/list');
  }
});

/* admin login process */
router.post('/', function(req, res, next) {
  var adminid = req.body.adminid;
  var adminpw = req.body.adminpw;
  var err_code = {};
  var sess;
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

          sess = req.session;
          sess.username = rows[0].ADMIN_ID;

        }
      }

      res.send(err_code);

    });

});

/* admin logout process */
router.get("/logout", function(req, res, next) {

  sess = req.session;
  console.log("OK2");
  //res.send("1111");
  if(sess.username) {
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }


  //console.log("OK");
});

module.exports = router;
