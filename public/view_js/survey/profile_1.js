$(function() {
    $(".nextStep").click(function() {
        if($("#username").val() == false) {
            //alert("이름을 입력해주세요.");
            if($("#lang").val() == "en") {
                bootbox.alert("Please enter your full name.");
            } else if($("#lang").val() == "cn") {
                bootbox.alert("Please enter your full name.");
            } else {
                bootbox.alert("이름을 입력해주세요.");
            }

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
                location.replace("/survey/surveyEnd?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&step="+data.STEP+"&lang="+$("#lang").val());
            } else {
                location.replace("/survey/profile?campaign_code="+$("#campaign_code").val()+"&uid="+$("#uid").val()+"&seq="+$("#seq").val()+"&quest_num="+$("#quest_num").val()+"&step="+data.STEP+"&lang="+$("#lang").val());
            }



            console.log(data);
            //
        }
    });
});