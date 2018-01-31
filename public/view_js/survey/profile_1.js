$(function() {
    $(".nextStep").click(function() {
        if($("#username").val() == false) {
            //alert("이름을 입력해주세요.");
            bootbox.alert("이름을 입력해주세요.");
            $("#username").focus();
            return;
        }

        var json = {
            campaign_code : $("#campaign_code").val()
            ,uid : $("#uid").val()
            ,quest_num : $("#quest_num").val()
            ,step : $("#step").val()
            ,data : $("#username").val()
            ,seq : $("#seq").val()
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