$(function() {
    $(".nextStep").click(function() {
        if($("#data").val() == false) {
            //alert("출생연도를 입력해주세요.");
            // bootbox.alert("출생연도를 입력해주세요.");

            if($("#lang").val() == "en") {
                bootbox.alert("Please enter your birth year.");
            } else if($("#lang").val() == "cn") {
                bootbox.alert("Please enter your birth year.");
            } else {
                bootbox.alert("출생연도를 입력해주세요.");
            }


            $("#data").focus();
            return;
        }

        if($("#data").val() < 4) {
            //alert("출생년도 4자리를 입력해주세요.");
            bootbox.alert("출생년도 4자리를 입력해주세요.");
            $("#data").focus();
            return;
        }

        var json = {
            campaign_code : $("#campaign_code").val()
            ,uid : $("#uid").val()
            ,quest_num : $("#quest_num").val()
            ,step : $("#step").val()
            ,data : $("#data").val()
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