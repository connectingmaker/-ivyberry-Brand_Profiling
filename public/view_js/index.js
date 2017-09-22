var loginUrl = "/users/list";

$(function() {
    $("header").hide();
    $("footer").hide();

    $("body").css({
        "padding" : "40px"
    });



    /********* click event *********/
    $("#loginBtn").click(function() {
        var adminid = $("#adminid");
        var adminpw = $("#adminpw");

        if(adminid.val() == false) {
            alert("아이디를 입력해주세요");
            adminid.focus();
            return;
        }

        if(adminpw.val() == false) {
            alert("패스워드를 입력해주세요");
            adminpw.focus();
            return;
        }

        var params = {};
        params.adminid = adminid.val();
        params.adminpw = adminpw.val();



        common.ajax.send("/", params);
        common.ajax.return = function(data) {
            switch(data.err_code) {
                case "000":
                    location.replace(loginUrl);
                    //console.log(data.data);
                    break;
                default:
                    alert(data.err_msg);
                    break;
            }
            //console.log(data);
        }
    });


});



