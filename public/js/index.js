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

        var params = {};
        params.adminid = adminid.val();
        params.adminpw = adminpw.val();

        common.ajax.send("/", params);
        common.ajax.return = function(data) {
            //console.log(data);
        }
    });


});



