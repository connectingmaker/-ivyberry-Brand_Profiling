/**
 * Created by jccho on 2018. 4. 14..
 */

var uid = "";



$(function() {
    $(".blackClick").click(function() {
        var uid = $(this).parents("tr").attr("id");
        var campaign_code = $(this).parents("tr").attr("campaign_code");
        var quest_num = $(this).parents("tr").attr("quest_num");
        var json = {
            uid : uid
            ,campaign_code:  campaign_code
            ,quest_num : quest_num
        };
        console.log(json);

        common.ajax.send("/users/blackDelProcess", json);
        common.ajax.return = function(data) {
            console.log(data);
            location.reload();

        }


    });


});