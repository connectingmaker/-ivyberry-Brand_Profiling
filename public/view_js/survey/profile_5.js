$(function() {
    $(".qaList").click(function() {
        $(".qaList").each(function() {
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-default");
        });

        $(this).removeClass("btn-default");
        $(this).addClass("btn-danger");

        var money = $(this).attr("money");

        $("#data").val(money);
    });

    $(".nextStep").click(function() {
        if($("#data").val() == false) {
            alert("지역을 선택해주세요.");
            $("#data").focus();
            return;
        }

        var json = {
            campaign_code : $("#campaign_code").val()
            ,uid : $("#uid").val()
            ,quest_num : $("#quest_num").val()
            ,step : $("#step").val()
            ,data : $("#data").val()
        };


        common.ajax.send('/survey/profileProcess', json);
        common.ajax.return = function(data) {

            if(data.STEP == 0) {
                location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&step="+data.STEP);
            } else {
                location.replace("/survey/profile?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&step="+data.STEP);
            }



            console.log(data);
            //
        }
    });
});