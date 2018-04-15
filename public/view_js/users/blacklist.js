/**
 * Created by jccho on 2018. 4. 14..
 */

var uid = "";



$(function() {
    $(".blackClick").click(function() {
        uid = $(this).parents("tr").attr("id");
        var json = {
            uid : uid
        };
        common.ajax.send("/users/blackDelProcess", json);
        common.ajax.return = function(data) {
            switch(data.ERR_CODE) {
                case "000":

                    if(data.DB_TYPE == "BLACK") {
                        $("#"+uid+" #blackBtn").html("블랙리스트 해제");
                        $("#"+uid+" #blackBtn").removeClass("btn-danger");
                        $("#"+uid+" #blackBtn").addClass("btn-primary");
                    }
                    break;

            }
        }


    });


});